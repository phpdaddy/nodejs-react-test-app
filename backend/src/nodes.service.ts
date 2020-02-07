import * as _ from "lodash";

export const nodesToTree = (nodes: any) => {
    const tree: any = {};
    for (const node of nodes) {
        const arr: string[] = node.name.split(">");
        const last = arr[arr.length - 1].trim();
        let path = '';
        for (const lvl of arr) {
            path += '[' + lvl.trim() + ']';
        }

        _.set(tree, path + '.name', last);
        _.set(tree, path + '.size', node.size);
    }

    normalizeKeys(tree);

    return tree.children;
};

const normalizeKeys = (tree: any) => {
    const keys = Object.keys(tree).filter(k => k !== 'name' && k !== 'size');

    tree['children'] = [];
    for (const key of keys) {
        let val = tree[key];
        normalizeKeys(val);
        tree['children'].push(val);
        delete tree[key];
    }
};
