Array.prototype.mapReduce = function(fn, thisArgs) {
    var arr = this,
        res = [];

    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }

    if (arr.length <= 0) {
        return [];
    }

    return arr.reduce((acc, i, index, arr) => {
        return res = res.concat(fn.call(thisArgs, i, index, arr));
    }, []);
};