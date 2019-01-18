Function.prototype.call2 = function() {
    var context = arguments[0] || window,
        fn = this,
        args = [],
        i = 1,
        res;

    context._fn = fn;
    for (; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    args = args.toString();
    res = eval('context._fn(' + args + ')');

    delete context._fn;

    return res;
};

var name = 'outer';
var obj = { name: 'inner' };

function foo() {
    return this.name;
}
console.log(foo.call2(obj));