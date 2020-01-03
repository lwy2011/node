//movie  sentence music 三个分类


//classic 是三个类的共性类，大类
// 尽可能地找到贴切的单词来描述

//图片，标题，日期，内容，点赞数量，image ,title ,pubdate,content ,fav_nums,type是类别

//music url


import {Model, Sequelize} from "sequelize";
import sequelize from "../../core/db";


const classicFields = {
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    type: Sequelize.TINYINT
};

class Movie extends Model {

}


Movie.init(classicFields,{sequelize,tableName:'movie'});

class Sentence extends Model {

}


Sentence.init(classicFields,{sequelize,tableName:'sentence'});


class Music extends Model {

}


Music.init(
    {...classicFields,url:Sequelize.STRING},
    {sequelize,tableName:'movie'}
    );


export {Movie,Music,Sentence}