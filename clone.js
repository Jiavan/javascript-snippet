function isPlainObject(obj) {
    return obj instanceof Object && obj !== obj.window && Object.prototype === Object.getPrototypeOf(obj);
}

function clone(src, deep) {
    var dst = isPlainObject(src) ? {} : [];

    for (var key in src) {
        if (deep && isPlainObject(src[key])) {
            dst[key] = clone(src[key], deep);
        } else if (deep && src[key] instanceof Array) {
            dst[key] = clone(src[key], deep);
        } else if (src[key] !== undefined) {
            dst[key] = src[key];
        }
    }

    return dst;
}

var arr1 = [1, 2, 3];
var arr2 = clone(arr1, true);
var obj1 = {
    name: 'obj1',
    obj: {
        arr: [1, 2, 3],
    }
}
var obj2 = clone(obj1, true);
var obj3 = clone(obj1, false);