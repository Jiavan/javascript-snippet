function flatten(arr) {
    var res = [];

    for (var item of arr) {
        if (item instanceof Array) {
            res = res.concat(flatten(item));
        } else {
            res.concat(item);
        }
    }

    return res;
}

var input = [
    2,
    5,
    'name',
    ['a', 'b', 'c'],
    [
        ['i', 'j', 'k'],
        ['x', 'y', 'z']
    ]
];

console.log(flatten(input));
