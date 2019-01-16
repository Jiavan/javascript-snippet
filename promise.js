function Promise(executor) {
    let self = this;

    self.status = 'pending';
    self.data = undefined;
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }

        if (self.status === 'pending') {
            setTimeout(() => {
                self.status = 'resolved';
                self.data = value;
                self.onResolvedCallback.forEach(callback => callback(value));
            });
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            setTimeout(() => {
                self.status = 'rejected';
                self.data = reason;
                self.onRejectedCallback.forEach(callback => callback(reason));
            });
        }
    }

    try {
        executor(resolve, reject);
    } catch(e) {
        reject(reason);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    let called = false,
        then;

    if (promise2 === x) {
        return reject(new TypeError());
    }

    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(v => resolvePromise(promise2, v, resolve, reject), r => reject(r));
        } else {
            x.then(resolve, reject);
        }

        return;
    }

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            then = x.then;

            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) {
                        return;
                    }
                    called = true;

                    return resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) {
                        return;
                    }
                    called = true;

                    return reject(r);
                });
            } else {
                resolve(x);
            }
        } catch(e) {
            if (called) {
                return;
            }
            called = true;

            return reject(e);
        }
    } else {
        resolve(x);
    }
}

Promise.prototype.then = function(onResolved, onRejected) {
    let self = this,
        promise2,
        x;

    onResolved = typeof onResolved === 'function' ? onResolved : (v => v);
    onRejected = typeof onRejected === 'function' ? onRejected : (r => { throw r; });

    function handleResolved(promise2, data, resolve, reject) {
        try {
            x = onResolved(data);
            resolvePromise(promise2, x, resolve, reject);
        } catch(e) {
            reject(e);
        }
    }

    function handleRejected(promise2, data, resolve, reject) {
        try {
            x = onRejected(data);
            resolvePromise(promise2, x, resolve, reject);
        } catch(e) {
            reject(e);
        }
    }

    if (self.status === 'resolved') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => { handleResolved(promise2, self.data, resolve, reject); });
        });
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => { handleRejected(promise2, self.data, resolve, reject); });
        });
    }

    if (self.status === 'pending') {
        return promise2 = new Promise((resolve, reject) => {
            self.onResolvedCallback.push(v => { handleResolved(promise2, v, resolve, reject); });
            self.onRejectedCallback.push(r => { handleRejected(promise2, r, resolve, reject); });
        });
    }
};

Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected);
};

Promise.resolve = v => {
    return new Promise((resolve, reject) => resolve(v));
};

Promise.reject = r => {
    return new Promise((resolve, reject) => reject(r));
};

Promise.all = promises => {
    let count = 0,
        i = 0,
        res = [];

    return new Promise((resolve, reject) => {
        for (; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(v => {
                count++;
                res.push(v);

                if (count === Promises.length) {
                    resolve(res);
                }
            }, r => {
                reject(r);
            });
        }
    });
};

Promise.race = promises => {
    let i = 0;

    return new Promise((resolve, reject) => {
        for (; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(v => {
                resolve(v);
            }, r => {
                reject(r);
            });
        }
    });
};

Promise.deferred = Promise.defer = () => {
    let dfd = {};

    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });

    return dfd;
};

try {
    module.exports = Promise;
} catch(e) {}
