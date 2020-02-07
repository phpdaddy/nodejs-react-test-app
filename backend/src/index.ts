import express from 'express'
import {connectDb} from "./connection";
import {Node} from "./Node.model";
import result from './assets/result.json'
import cors from 'cors'

const app = express();

app.use(cors());

const PORT = 8081;

app.get("/nodes", async (req, res) => {
    const nodes = await Node.find();

    res.json(nodes);
});


app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}`);

    await connectDb();

    console.log("MongoDb connected");

    await Node.deleteMany({});
    await Node.create(result);

    console.log("MongoDb data loaded");
});
