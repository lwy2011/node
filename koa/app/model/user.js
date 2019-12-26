import {Sequelize, Model} from "sequelize";
import sequelize  from "../../core/db";


class User extends Model {

}

User.init({
    //主键 ：唯一，辨识度，而且不为空
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true     //自动增长
    },
    nickname: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
},{sequelize});


export default User;