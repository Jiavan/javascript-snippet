function shuffle(arr) {
    var res = [],
        i = 0,
        random;

    while (arr.length) {
        random = Math.floor(Math.random() * arr.length);
        res.push(arr[random]);
        arr.splice(random, 1);
    }

    return res;
}

console.log(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));