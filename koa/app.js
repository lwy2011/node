import {test} from "./router";
import Koa from "koa";

const app = new Koa();

//洋葱模型演示：
app.use((ctx, next) => {
    console.log(1);
    next();  //下一个中间键，否则就不会到下一个中间键
    console.log(12);
});
app.use((ctx, next) => {
    console.log(2);
    next();
    console.log(22);
});
// 1
// 2
// test
// 22
// 12



app.use(test);

app.listen(3000);
