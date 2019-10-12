//console.log(arguments);

// [Arguments] {
//     '0': {},
//     '1': [Function: require] {
//         resolve: [Function: resolve] { paths: [Function: paths] },
//         main: Module {
//             id: '.',
//                 path: '/Users/liuwanyong2017/Desktop/node/node',
//                 exports: {},
//             parent: null,
//                 filename: '/Users/liuwanyong2017/Desktop/node/node/1.js',
//                 loaded: false,
//                 children: [],
//                 paths: [Array]
//         },
//         extensions: [Object: null prototype] {
//             '.js': [Function],
//                 '.json': [Function],
//                 '.node': [Function],
//                 '.mjs': [Function]
//         },
//         cache: [Object: null prototype] {
//             '/Users/liuwanyong2017/Desktop/node/node/1.js': [Module]
//         }
//     },
//     '2': Module {
//         id: '.',
//             path: '/Users/liuwanyong2017/Desktop/node/node',
//             exports: {},
//         parent: null,
//             filename: '/Users/liuwanyong2017/Desktop/node/node/1.js',
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
//     '3': '/Users/liuwanyong2017/Desktop/node/node/1.js',
//         '4': '/Users/liuwanyong2017/Desktop/node/node'
// }

console.log(arguments.callee,arguments.callee + '')

//[Function]
// function (exports, require, module, __filename, __dirname) {
        //.......
// console.log(arguments.callee,arguments.callee + '')
// }


//单文件模块就是个闭包函数
//函数的参数如上打印