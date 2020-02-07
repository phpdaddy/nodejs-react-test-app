const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const fs = require('fs');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const input = require("../src/assets/input.html");

module.exports.run = function () {
    console.log('hi');

    const {window} = new JSDOM(input);

    var ul = window.document.querySelector("ul");
    console.log(ul.className)
    var items = ul.querySelectorAll(":scope > li > a");
    for (var i = 0; i < items.length; ++i) {
        const nodeText = console.log(items[i].textContent.trim())
    }
};
