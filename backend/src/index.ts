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
    const tree = {};
    for (const node of nodes) {
        const arr = node.name.split(">");
        const last = arr.pop();
        let path = '';
        for (const lvl of arr) {
            path += '[' + lvl + ']';
        }
        _.set(tree, path + '.name', last);
    }
    return tree;
};

app.get("/nodes", async (req, res) => {
    const nodes = await Node.find();

    res.json(nodes);
});


app.get("/nodes-tree", async (req, res) => {
    const nodes = await Node.find();

    const tree = nodesToTree(nodes);
    console.log(tree);
    res.json();
});


app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}`);

    await connectDb();

    console.log("MongoDb connected");

    await Node.deleteMany({});
    await Node.create(result);

    console.log("MongoDb data loaded");
});
