import express from 'express'
import {connectDb} from "./connection";
import {Node} from "./Node.model";
import result from './assets/result.json'

const app = express();

const PORT = 8080;

app.get("/nodes", async (req, res) => {
    const nodes = await Node.find();

    res.json(nodes);
});


app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}`);

    await connectDb();

    console.log("MongoDb connected");

    //await mongoose.connection.db.dropCollection('node');

    Node.create(result);
});
