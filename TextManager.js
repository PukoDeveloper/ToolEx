var ToolEx = ToolEx || {};
ToolEx.TextManager = true;

class TextManager {
    static #data = {};
    static apply_func = [];
    constructor() {
        if (new.target === TextManager) {
            throw new TypeError("Cannot construct TextManager instances.");
        }
    }
    static load(land_path) {
        return new Promise((resolve, reject) => {
            fetch(land_path).then(response => response.text())
                .then(text => {
                    this.#data = JSON.parse(text);
                    resolve();
                })
                .catch(error => reject(error));
        });
    }
    static get(key) {
        return this.#data[key] || key;
    }
    static apply() {
        document.querySelectorAll('[data-text]').forEach(element => {
            element.textContent = this.get(element.dataset.text);
        });
        this.apply_func.forEach(func => {
            func();
        });
    }
    static on_apply(func) {
        this.apply_func.push(func);
    }
}