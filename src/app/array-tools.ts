interface Array<T> {
    empty(): T[];
    remove(...o: T[]): T[];
    clone(): T[];
    shuffle(): T[];
    rotate(n: number): T[];
}

interface Promise<T> {
    finally(cb): Promise<T>;
}

Array.prototype.empty = function() {
    this.splice(0, this.length);
    return this;
};

Array.prototype.remove = function(...a) {
    if (Array.isArray(a)) {
        var th = this;
        a.forEach(function(item) {
            th.remove(item);
        });
    }
    else {
        var index = this.indexOf(a);

        if (index !== -1) {
            this.splice(index, 1);
        }
    }
    return this;
};

Array.prototype.clone = function() {
    return this.slice(0);
};

Array.prototype.shuffle = function() {
    var counter = this.length, temp, index;

    while (counter > 0) {
        index = Math.floor(Math.random() * counter);

        counter--;

        temp = this[counter];
        this[counter] = this[index];
        this[index] = temp;
    }

    return this;
};

Array.prototype.rotate = function(n) {
    this.unshift(...this.splice(n, this.length));
    return this;
};

Promise.prototype.finally = function(cb) {
    const res = () => this
    const fin = () => Promise.resolve(cb()).then(res)
    return this.then(fin, fin);
};