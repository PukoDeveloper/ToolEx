
String.prototype.toStyleString = function () {
    var ru = "<span>";
    var text = "";
    var fcolor = "";
    var bcolor = "";
    var match;

    function push() {
        if (text.length === 0) return;
        ru += `<span style="` + (fcolor !== "" ? `color: ${fcolor};` : "") + (bcolor !== "" ? `background-color: ${bcolor};` : "") + `">${text}</span>`;
        text = "";
    }

    // var _t = this.replace(/\n/g, '<br>');

    while ((match = /(?<color_key>\$(?<color_key_type>b|f)\[(?<color_key_value>[a-zA-Z]*?)\])|(?<color_rgb>\$(?<color_rgb_type>b|f)\[(?<color_rgb_value1>[0-9]+),(?<color_rgb_value2>[0-9]+),(?<color_rgb_value3>[0-9]+)\])|(?<style>#\[(?<style_type>b|u|i|s|v|c)\])|(?<wrap>\n)|(?<text>[\s\S]+?)/gm.exec(this.toString())) !== null) {
        if (match.groups?.color_key) {
            if (match.groups?.color_key_type === 'f') {
                fcolor = match.groups?.color_key_value;
                push();
            } else if (match.groups?.color_key_type === 'b') {
                bcolor = match.groups?.color_key_value;
                push();
            }
        }
        if (match.groups?.color_rgb) {
            if (match.groups?.color_key_type === 'f') {
                fcolor = `rgb(${match.groups?.color_rgb_value1},${match.groups?.color_rgb_value2},${match.groups?.color_rgb_value3})`;
                push();
            } else if (match.groups?.color_key_type === 'b') {
                bcolor = `rgb(${match.groups?.color_rgb_value1},${match.groups?.color_rgb_value2},${match.groups?.color_rgb_value3})`;
                push();
            }
        }
        if (match.groups?.wrap) {
            push();
            ru += '<br>';
        }
        if (match.groups?.text) {
            text += match.groups?.text;
        }
    }
    push();
    ru += '</span>'
    return ru;
}