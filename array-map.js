Array.prototype.map2 = function() {
    var arr = this,
        args = [].slice.call(arguments),
        fn = args[0],
        thisArg = args[1],
        res = [];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    for (var i = 0; i < arr.length; i++) {
        res.push(fn.call(thisArg, arr[i], i, arr));
    }

    return res;
}