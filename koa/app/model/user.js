import {Sequelize, Model} from "sequelize";
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
    }
}


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