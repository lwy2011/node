import {Model, Sequelize} from "sequelize";
import sequelize from "../../core/db";
import bcrypt from "bcrypt";
import {AuthFailed} from "../../core/http-exception";

class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new AuthFailed("用户名不存在！");
        }
        const test =
            bcrypt.compareSync(plainPassword, user.password);
        if (!test) {
            throw new AuthFailed("密码错误！");
        }
        return user;
    }

    static async verifyWxOpenId(openid) {
        const user = await User.findOne({
            where: {openid}
        });
        return user
    }

    static async wxOpenidCreate(data) {
        const user = await User.create(data);
        return user
    }
}

//创建数据库表：思考的是model模型！是业务：code first。
// model 模型来创建表
// 面向对象，模型，是类，很符合
//初始化数据：期刊书籍.
//创建期刊，书籍，表。
// 设计表，由粗到细

// user,
// 期刊，有小的类，
// 、movie .Sentence,music，有相似性，有扩展性
// 一期一期的概念，每一期的期刊 Flow。
// 设计数据库：感觉，主要对象，对象属性，对象间的关系。
// 实体模型实体表，对应了，实体的共有属性的表叫业务表，抽象，多变性，好坏查询性能。


User.init({
    //主键 ：唯一，辨识度，而且不为空
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true     //自动增长
    },
    nickname: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10);
            console.log(val, salt);
            const pwd = bcrypt.hashSync(val, salt);
            this.setDataValue("password", pwd);
        }
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {sequelize, tableName: "user"});  //不要首字母大写，不要复数


export default User;