//Buffer node的对象，专门把JS的数据转换为二进制数据的对象
//不需要引入就可以用

const a = Buffer.alloc(10)

console.log(a);
//<Buffer 00 00 00 00 00 00 00 00 00 00>  16进制

const b = Buffer.alloc(10,3)

console.log(b);

//<Buffer 03 03 03 03 03 03 03 03 03 03>,参数可初始化配置


const c = Buffer.allocUnsafe(10)

console.log(c);

//<Buffer 12 00 00 00 90 03 00 00 f9 b3>脏数据初始化，不推荐


const d = Buffer.from("刘万永")

console.log(d);

//<Buffer e5 88 98 e4 b8 87 e6 b0 b8>  常用

console.log(d.toString());  //刘万永

console.log(Buffer.from([1, 3, 5, 6]));  //<Buffer 01 03 05 06>

console.log(Buffer.from(["s", 2]));  //<Buffer 00 02>  数组中只能是数字，字符串不行