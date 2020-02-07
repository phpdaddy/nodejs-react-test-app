const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const fs = require('fs');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const input = require("../src/assets/input.html");

function loopTree(prefix, ul) {
    const lis = ul.querySelectorAll(":scope > li");
    for (var i = 0; i < lis.length; ++i) {
        const nodeText = lis[i].querySelector('a').textContent.trim();

        const groups = /(.+)\((.+)\)/.exec(nodeText);
        const name = groups[1].trim();
        const size = groups[2].trim();

        const node = {
            name: prefix ? prefix + " > " + name : name,
            size: size
        };

        console.log(node);

        const ul = lis[i].querySelector("ul");

        if (ul) {
            loopTree(node.name, ul);
        }
    }
}

module.exports.run = function () {
    console.log('hi');

    const {window} = new JSDOM(input);

    loopTree('', window.document.querySelector("ul"));

};
