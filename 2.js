console.log(exports);
//{}
//这里指向了module对象内的exports属性


console.log(require);

// [Function: require] {
//     resolve: [Function: resolve] { paths: [Function: paths] },
//     main: Module {
//         id: '.',
//             path: '/Users/liuwanyong2017/Desktop/node/node',
//             exports: {},
//         parent: null,
//             filename: '/Users/liuwanyong2017/Desktop/node/node/2.js',
//             loaded: false,
//             children: [],
//             paths: [
//             '/Users/liuwanyong2017/Desktop/node/node/node_modules',
//             '/Users/liuwanyong2017/Desktop/node/node_modules',
//             '/Users/liuwanyong2017/Desktop/node_modules',
//             '/Users/liuwanyong2017/node_modules',
//             '/Users/node_modules',
//             '/node_modules'
//         ]
//     },
//     extensions: [Object: null prototype] {
//         '.js': [Function],
//             '.json': [Function],
//             '.node': [Function],
//             '.mjs': [Function]
//     },
//     cache: [Object: null prototype] {
//         '/Users/liuwanyong2017/Desktop/node/node/2.js': Module {
//             id: '.',
//                 path: '/Users/liuwanyong2017/Desktop/node/node',
//                 exports: {},
//             parent: null,
//                 filename: '/Users/liuwanyong2017/Desktop/node/node/2.js',
//                 loaded: false,
//                 children: [],
//                 paths: [Array]
//         }
//     }
// }

//加载依赖模块的函数



console.log(module);

// Module {
//     id: '.',
//         path: '/Users/liuwanyong2017/Desktop/node/node',
//         exports: {},
//     parent: null,
//         filename: '/Users/liuwanyong2017/Desktop/node/node/2.js',
//         loaded: false,
//         children: [],
//         paths: [
//         '/Users/liuwanyong2017/Desktop/node/node/node_modules',
//         '/Users/liuwanyong2017/Desktop/node/node_modules',
//         '/Users/liuwanyong2017/Desktop/node_modules',
//         '/Users/liuwanyong2017/node_modules',
//         '/Users/node_modules',
//         '/node_modules'
//     ]
// }


//当前模块的所有属性内容

console.log(__filename);
// /Users/liuwanyong2017/Desktop/node/node/2.js
//当前模块的绝对路径

console.log(__dirname);

// /Users/liuwanyong2017/Desktop/node/node

//当前模块的文件目录



//实质是：顶部添加

// ( function(exports,require,module,__filename,__dirname){



    //内部是：

    // require('xxx')  依赖
    //exports = module.exports = {}
    // .......
    //exports.xxx  = 。。。
    //module.exports = {x,y,z}


//底部自动添加：

    //return module.exports
//})()
