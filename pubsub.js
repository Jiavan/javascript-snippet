function Pubsub() {
    this.map = {};
}

Pubsub.prototype = {
    constructor: Pubsub,
    on: function(name, callback) {
        if (this.map[name]) {
            this.map[name].push(callback);
        } else {
            this.map[name] = [];
            this.map[name].push(callback);
        }
    },
    off: function(name, callback) {
        if (this.map[name] && callback) {
            this.map[name].splice(this.map[name].indexOf(callback), 1);

            return true;
        } else if (this.map[name]) {
            delete this.map[name];

            return true;
        }

        return false;
    },
    emit: function(name) {
        if (this.map[name]) {
            this.map[name].forEach(item => item());
        }
    }
};

var p = new Pubsub();

p.on('test', () => {
    console.log('test');
});
p.on('test', () => {
    console.log('test2');
});
p.on('hi', () => {
    console.log('hi');
});
p.emit('test');
p.emit('hi');