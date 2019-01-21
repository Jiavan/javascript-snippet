function shuffle(arr) {
    var i = arr.length - 1,
        random,
        tmp;

    while(i !== 0) {
        random = Math.floor(Math.random() * i);
        tmp = arr[random];
        arr[random] = arr[i];
        arr[i] = tmp;
        i--;
    }

    return arr;
}

console.log(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));