import Koa from "koa";

const app = new Koa();

//洋葱模型演示：
// app.use((ctx, next) => {
//     console.log(1);
//     const a = next();  //下一个中间键，否则就不会到下一个中间键
//     console.log(a);
//     console.log(12);
// });
// app.use((ctx, next) => {
//     console.log(2);
//     const a = next();
//     console.log(a);
//     console.log(22);
//     return 'ttt'     //返回给next函数，next函数把值强制转换为Promise
// });
// 1
// 2
// test
// Promise { undefined }
// 22
// Promise { 'ttt' }
// 12


// app.use(test);

//next 实质为promise

//以上洋葱模型的解析，重在定制顺序，顺序又跟node的异步结合了，所以中间键函数，经验总结
// 中间键函数都要用async await 强制做成Promise，又跟next的实质为promise正好匹配。



//中间键函数用async ，next函数用await：为了保证洋葱模型的顺序执行！

// app.use((ctx, next) => {
//     console.log(1);
//     next();
//     console.log(12);
// });
//
// app.use((ctx, next) => {
//     console.log(2);
//     next();
//     console.log(22);
// });
//
// app.use( async () => {
//     await new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(21);
//             resolve(3);
//         }, 1200);
//     });
// });

//await 会阻塞线程，锁定当前的执行顺序。这保证了洋葱模式的执行顺序，不被嵌套的异步所打扰！



//await 也是适合拿到异步的操作的最终值，而不是一个promise对象,
// 上面说过，每一个next引导的最终结果都是promise

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(12);
    console.log(ctx.r);
});

app.use(async (ctx, next) => {
    console.log(2);
    ctx.r = await next();
    console.log(22);
});

app.use( async () => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            console.log(21);
            resolve(3);
        }, 1200);
    })
});

app.listen(3000);
