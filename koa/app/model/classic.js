//movie  sentence music 三个分类


//classic 是三个类的共性类，大类
// 尽可能地找到贴切的单词来描述

//图片，标题，日期，内容，点赞数量，image ,title ,pubdate,content ,fav_nums,type是类别

//music url


import {Model, Sequelize} from "sequelize";
import sequelize from "../../core/db";


const classicFields = {
    image: {
        type:Sequelize.STRING,
        get(){
            return global.config.host + this.getDataValue('image')
        },
        //如此处理补全url的方案失败，后端可以拿到，前端拿不到的，还是原本的url。不起作用。
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: {
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    type: Sequelize.TINYINT
};

class Movie extends Model {

}


Movie.init(classicFields, {sequelize, tableName: "movie"});

class Sentence extends Model {

}


Sentence.init(classicFields, {sequelize, tableName: "sentence"});


class Music extends Model {

}


Music.init(
    Object.assign(classicFields, {url: Sequelize.STRING}),
    {sequelize, tableName: "music"}
);


export {Movie, Music, Sentence};