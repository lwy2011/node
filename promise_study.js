const fs = require("fs");
const path = require("path");

const read = (Path, callback) => {
    fs.readFile(path.join(__dirname, Path), (err, data) => {
        if (err) throw err;
        console.log(Path, data.toString());
        callback && callback();
    });
};

const read3 = () => {read("/3.js");};
const read2 = () => {read("/2.js", read3);};
const read1 = () => {read("/1.js", read2);};


// read1();


// 回调很烦，而且要逆推，迭代才舒服，否则就是地狱嵌套！


//自己设计的，，，感觉很傻瓜式的

const readPromise = (Path, callback) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, Path), (err, data) => {
            if (err) reject(err);
            callback && callback(data);  //这里最好是同步的操作，或者是异步是独立的操作，独立性的
            resolve(data);
        });
    });
};

readPromise("/1.js", () => console.log(1))
    .then(data => {console.log(data);})
    .catch(err => console.log(err));

const readFn = (Path, callback, thenFn, errFn) => readPromise(Path, callback)
    .then(data => {
        thenFn && thenFn(data);
        return data;
    })
    .catch(errFn);

readFn("/1.js",
    () => console.log(1),
    data => console.log(data),
    err => console.log(err))
    .then(
        () => {
            return readFn("/2.js",
                () => console.log(2),
                data => console.log(data),
                err => console.log(err));
        }
    ).then(
    () => {
        return readFn("/3.js",
            () => console.log(3),
            data => console.log(data),
            err => console.log(err));
    }
);

//其实最简单的傻瓜式的是Promise.all，不过一个报错，全家玩完。

Promise.all(
    [
        readFn("/1.js",
            () => console.log(1),
            data => console.log(data),
            err => console.log(err)),
        readFn("/2.js",
            () => console.log(2),
            data => console.log(data),
            err => console.log(err)),
        readFn("/3.js",
            () => console.log(3),
            data => console.log(data),
            err => console.log(err))
    ]
).then(data => {console.log(data);});