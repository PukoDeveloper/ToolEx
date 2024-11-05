var ToolEx = ToolEx || {};
ToolEx.JavascriptEx = true;

String.prototype.format = function (...args) {
    return this.replace(/f{(\d+)}/g, (match, index) => args[index] || '%s');
}


Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
}

