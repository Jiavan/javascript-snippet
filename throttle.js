function throttle(fn, wait) {
    var current = 0,
        timer;

    return function() {
        var context = this,
            args = arguments,
            now = new Date().getTime();

        if (now - current > wait) {
            current = now;
            fn.apply(context, args);
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                current = now;
                fn.apply(context, args);
            }, wait);
        }
    };
}

var foo = throttle(() => console.log(1), 1000);

setInterval(() => foo(), 100);