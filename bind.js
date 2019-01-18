Function.prototype.bind2 = function() {
    var context = arguments[0] || window,
        fn = this,
        args = [],
        bound;

    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    function noop() {}

    function bound() {
        return fn.apply(new.target ? this : context, args.concat([].slice.call(arguments)));
    };

    noop.prototype = fn.prototype;
    bound.prototype = new noop();

    return bound;
};

var obj = { name: 'obj name' };
var name = 'window name';

function foo(str) { return this.name + str; }

var foo2 = foo.bind2(obj, 'hello');
console.log(foo('hi'), foo2());