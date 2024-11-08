var ToolEx = ToolEx || {};
ToolEx.TextManager = true;

class TextManager {
    static #data = {};
    static apply_func = [];
    static #events = ToolEx.EventObject ? new EventObject() : null;
    constructor() {
        if (new.target === TextManager) {
            throw new TypeError("Cannot construct TextManager instances.");
        }
    }
    static load(land_path) {
        if (this.#events) {
            this.#events.emit('loading');
        }
        return new Promise((resolve, reject) => {
            fetch(land_path).then(response => response.text())
                .then(text => {
                    this.#data = JSON.parse(text);
                    if (this.#events) {
                        this.#events.emit('loaded');
                    }
                    resolve();
                })
                .catch(error => reject(error));
        });
    }
    static get(key) {
        var ru = this.#data[key] || key;
        if (this.#events) {
            var _r = this.#events.emit('get', key);
            if (_r.returnValue !== undefined) {
                ru = _r.returnValue;
            }
        }
        return ru;
    }
    static apply() {
        if (this.#events) {
            this.#events.emit('apply');
        }
        document.querySelectorAll('[data-text]').forEach(element => {
            element.textContent = this.get(element.dataset.text);
        });
        this.apply_func.forEach(func => {
            func();
        });
        if (this.#events) {
            this.#events.emit('applied');
        }
    }
    static on_apply(func) {
        this.apply_func.push(func);
    }
    static on(event, callback) {
        if (this.#events) {
            this.#events.on(event, callback);
        }
        else {
            throw new Error('Need to initialize EventObject.  Please include EventObject in your project.');
        }
    }
}