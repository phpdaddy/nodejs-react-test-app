import express from 'express'
import {connectDb} from "./connection";
import {Node} from "./Node.model";
import result from './assets/result.json'
import cors from 'cors'
import * as _ from 'lodash';

const app = express();

app.use(cors());

const PORT = 8081;

const nodesToTree = (nodes: any) => {
    const tree: any = {};
    for (const node of nodes) {
        const arr: string[] = node.name.split(">");
        const last = arr[arr.length - 1];
        let path = '';
        for (const lvl of arr) {
            path += '[' + lvl.trim() + ']';
        }

        _.set(tree, path + '.name', last);
    }

    normalizeKeys(tree);

    return tree.children;
};

const normalizeKeys = (tree: any) => {
    const keys = Object.keys(tree).filter(k => k !== 'name');

    tree['children'] = [];
    for (const key of keys) {
        let val = tree[key];
        normalizeKeys(val);
        tree['children'].push(val);
        delete tree[key];
    }
};

app.get("/nodes", async (req, res) => {
    const nodes = await Node.find();

    res.json(nodes);
});


app.get("/nodes-tree", async (req, res) => {
    const nodes = await Node.find();

    const tree = nodesToTree(nodes);
    console.log(tree);
    res.json(tree);
});


app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}`);

    await connectDb();

    console.log("MongoDb connected");

    await Node.deleteMany({});
    await Node.create(result);

    console.log("MongoDb data loaded");
});
