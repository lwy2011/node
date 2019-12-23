import {test} from "./router";
import Koa from "koa";

const app = new Koa();

//洋葱模型演示：
app.use((ctx, next) => {
    console.log(1);
    const a = next();  //下一个中间键，否则就不会到下一个中间键
    console.log(a);
    console.log(12);
});
app.use((ctx, next) => {
    console.log(2);
    const a = next();
    console.log(a);
    console.log(22);
    return 'ttt'     //返回给next函数，next函数把值强制转换为Promise
});
// 1
// 2
// test
// Promise { undefined }
// 22
// Promise { 'ttt' }
// 12


app.use(test);

//next 实质为promise

//以上洋葱模型的解析，重在定制顺序，顺序又跟node的异步结合了，所以中间键函数，经验总结
// 中间键函数都要用async await 强制做成Promise



app.listen(3000);
