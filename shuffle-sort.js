function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
console.log(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));