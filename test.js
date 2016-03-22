console.log((46840404742).toString(36).replace(/\u0066/, function() {
    return arguments[0].toUpperCase();
}));
console.log((46840404742).toString(36));


// "2-36"进制的任意转换
// 1.Number toString()
// 2.自己实现算法并绑定参数;
//
// http://tool.oschina.net/hexconvert
