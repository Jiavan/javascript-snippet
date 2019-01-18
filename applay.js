Function.prototype.apply2 = function() {
    var context = arguments[0] || window,
        args = [],
        i = 1,
        res;

    context._fn = this;
    for (; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    res = eval('context._fn(' + args + ')');

    delete context._fn;

    return res;
};

var name = 'outer';
var obj = { name: 'inner' };

function foo() {
    return this.name;
}
console.log(foo.apply2(obj));