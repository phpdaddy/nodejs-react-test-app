const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const fs = require('fs');

require.extensions['.xml'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const input = require("../src/assets/structure_released.xml");

function loopTree(array, prefix, syset) {
    const name = syset.getAttribute('words').trim();

    const size = syset.querySelectorAll("synset").length;

    const newName = prefix ? prefix + " > " + name : name;

    const node = {
        name: newName,
        size: size
    };

    console.log(node);

    array.push(node);

    for (var i = 0; i < syset.children.length; ++i) {

        loopTree(array, newName, syset.children[i]);
    }
}

module.exports.run = function () {
    console.log('hi');

    const {window} = new JSDOM(input);

    let array = [];
    loopTree(array, '', window.document.querySelector("synset"));

    fs.writeFile('src/assets/result.json', JSON.stringify(array), 'utf8', () => {
    });
};
