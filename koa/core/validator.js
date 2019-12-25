import validator from "validator";

import {
    get,
    last,
    set,
    cloneDeep
} from "lodash";

import {findMembers} from "./util";
import {ParameterException} from "./http-exception";


//检验器的最初版本


class Validator {
    constructor() {
        this.data = {};
        this.parsed = {};
    }

    static _assembleAllParams(ctx) {                //拿到数据的方法！
        return {
            body: ctx.request.body,
            query: ctx.request.query,
            path: ctx.params,
            header: ctx.request.header
        };
    }

    get(path, parsed = true) {
        if (parsed) {
            const value = get(this.parsed, path, null);
            if (value == null) {
                const keys = path.split(".");
                const key = last(keys);
                return get(this.parsed.default, key);
            }
            return value;
        } else {
            return get(this.data, path);
        }
    }

    _findMembersFilter(key) {                       //筛选校验的key了
        if (/validate([A-Z])\w+/g.test(key)) {
            return true;
        }
        if (this[key] instanceof Array) {
            this[key].forEach(value => {
                const isRuleType = value instanceof Rule;
                if (!isRuleType) {
                    throw new Error("验证数组必须全部为Rule类型");
                }
            });
            return true;
        }
        return false;
    }

    validate(ctx, alias = {}) {                             //验证步骤
        this.alias = alias;
        let params = Validator._assembleAllParams(ctx);   //1拿到数据
        this.data = cloneDeep(params);
        this.parsed = cloneDeep(params);

        const memberKeys = findMembers(this, {                //2 拿到校验的key们
            filter: this._findMembersFilter.bind(this)
        });

        const errorMsgs = [];
        // const map = new Map(memberKeys)
        for (let key of memberKeys) {                           //3开始校验
            const result = this._check(key, alias);
            if (!result.success) {
                errorMsgs.push(result.msg);
            }
        }
        if (errorMsgs.length !== 0) {                           //4判断结果
            throw new ParameterException(errorMsgs);
        }
        ctx.v = this;
        return this;                                            //5 结果储存在ctx.v 中，然后 返回自身
    }

    _check(key, alias = {}) {
        const isCustomFunc = typeof (this[key]) === "function";
        let result;
        if (isCustomFunc) {
            try {
                this[key](this.data);
                result = new RuleResult(true);
            } catch (error) {
                result = new RuleResult(false, error.msg || error.message || "参数错误");
            }
            // 函数验证
        } else {
            // 属性验证, 数组，内有一组Rule
            const rules = this[key];
            const ruleField = new RuleField(rules);
            // 别名替换
            key = alias[key] ? alias[key] : key;
            const param = this._findParam(key);

            result = ruleField.validate(param.value);

            if (result.pass) {
                // 如果参数路径不存在，往往是因为用户传了空值，而又设置了默认值
                if (param.path.length === 0) {
                    set(this.parsed, ["default", key], result.legalValue);
                } else {
                    set(this.parsed, param.path, result.legalValue);
                }
            }
        }
        if (!result.pass) {
            const msg = `${isCustomFunc ? "" : key}${result.msg}`;
            return {
                msg: msg,
                success: false
            };
        }
        return {
            msg: "ok",
            success: true
        };
    }

    _findParam(key) {
        let value;
        value = get(this.data, ["query", key]);
        if (value) {
            return {
                value,
                path: ["query", key]
            };
        }
        value = get(this.data, ["body", key]);
        if (value) {
            return {
                value,
                path: ["body", key]
            };
        }
        value = get(this.data, ["path", key]);
        if (value) {
            return {
                value,
                path: ["path", key]
            };
        }
        value = get(this.data, ["header", key]);
        if (value) {
            return {
                value,
                path: ["header", key]
            };
        }
        return {
            value: null,
            path: []
        };
    }
}

class RuleResult {
    constructor(pass, msg = "") {
        Object.assign(this, {
            pass,
            msg
        });
    }
}

class RuleFieldResult extends RuleResult {
    constructor(pass, msg = "", legalValue = null) {
        super(pass, msg);
        this.legalValue = legalValue;
    }
}

class Rule {
    constructor(name, msg, ...params) {
        Object.assign(this, {
            name,
            msg,
            params
        });
    }

    validate(field) {
        if (this.name === "optional")
            return new RuleResult(true);
        if (!validator[this.name](field + "", ...this.params)) {
            return new RuleResult(false, this.msg || this.message || "参数错误");
        }
        return new RuleResult(true, "");
    }
}

class RuleField {
    constructor(rules) {
        this.rules = rules;
    }

    validate(field) {
        if (field == null) {
            // 如果字段为空
            const allowEmpty = this._allowEmpty();
            const defaultValue = this._hasDefault();
            if (allowEmpty) {
                return new RuleFieldResult(true, "", defaultValue);
            } else {
                return new RuleFieldResult(false, "字段是必填参数");
            }
        }

        const filedResult = new RuleFieldResult(false);
        for (let rule of this.rules) {
            let result = rule.validate(field);
            if (!result.pass) {
                filedResult.msg = result.msg;
                filedResult.legalValue = null;
                // 一旦一条校验规则不通过，则立即终止这个字段的验证
                return filedResult;
            }
        }
        return new RuleFieldResult(true, "", this._convert(field));
    }

    _convert(value) {
        for (let rule of this.rules) {
            if (rule.name === "isInt") {
                return parseInt(value);
            }
            if (rule.name === "isFloat") {
                return parseFloat(value);
            }
            if (rule.name === "isBoolean") {
                return !!value;
            }
        }
        return value;
    }

    _allowEmpty() {
        for (let rule of this.rules) {
            if (rule.name === "optional") {
                return true;
            }
        }
        return false;
    }

    _hasDefault() {
        for (let rule of this.rules) {
            const defaultValue = rule.params[0];
            if (rule.name === "optional") {
                return defaultValue;
            }
        }
    }
}


export {
    Rule,
    Validator
};