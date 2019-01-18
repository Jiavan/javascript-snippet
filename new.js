// 1. 创建临时对象的__proto__指向构造函数原型
// 2. 执行构造函数体
// 3. 如果构造函数返回一个对象则返回对象，否则返回临时对象
function new2() {
    var Constructor = arguments[0],
        args = [].slice.call(arguments, 1),
        tmp = {},
        res;

    tmp.__proto__ = Constructor.prototype;
    res = Constructor.apply(tmp, args);

    return typeof res === 'object' ? res : tmp;
}

function A(a, b) {
    this.a = a;
    this.b = b;
}

var a = new2(A, 1, 2);
console.log(a);