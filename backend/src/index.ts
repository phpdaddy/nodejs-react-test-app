import express from 'express'
import {connectDb} from "./connection";
import {Node} from "./Node.model";
import cors from 'cors'
import {nodesToTree} from "./nodes.service";

const app = express();

app.use(cors());

const PORT = 8081;


app.get("/nodes", async (req, res) => {
    const nodes = await Node.find();

    res.json(nodes);
});


app.get("/nodes-tree", async (req, res) => {
    console.log(req.query.search);
    const regex = '.*>[^>]*(\\w*' + req.query.search + '\\w*)[^>]*';
    const nodes = await Node.find({name: {$regex: regex, $options: "i"}});

    const tree = nodesToTree(nodes);
    res.json(tree);
});


app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}`);

    await connectDb();

    console.log("MongoDb connected");

    //await Node.deleteMany({});
    //await Node.create(result);

    console.log("MongoDb data loaded");
});
