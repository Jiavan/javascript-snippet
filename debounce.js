function debounce(fn, wait) {
    var timer;

    return function() {
        var context = this,
            args = arguments;

        clearTimeout(timer);

        timer = setTimeout(function () {
            fn.apply(context, args);
        }, wait);
    }
}

var foo = debounce(function() {
    console.log(1);
}, 1000);