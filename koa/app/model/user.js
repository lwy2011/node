import {Sequelize, Model} from "sequelize";
import sequelize from "../../core/db";
import bcrypt from "bcrypt";

class User extends Model {}


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
            console.log(val,salt);
            const pwd = bcrypt.hashSync(val, salt);
            this.setDataValue('password',pwd);
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