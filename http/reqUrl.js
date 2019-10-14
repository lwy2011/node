//URL模块

const url = require('url')


const urlObj = url.parse('https://study.163.com/course/courseLearn.htm?courseId=1209407934&from=study#/learn/video?lessonId=1279370002&courseId=1209407934')

console.log(urlObj);


const urlObj1 = new URL('https://study.163.com/course/courseLearn.htm?courseId=1209407934&from=study#/learn/video?lessonId=1279370002&courseId=1209407934')

console.log(urlObj1);