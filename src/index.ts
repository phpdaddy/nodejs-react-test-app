import express from 'express'
import {connectDb} from "./connection";
import {User} from "./User.model";

const app = express();

const PORT = 8080;

app.get("/users", async (req, res) => {
    const users = await User.find();

    res.json(users);
});

app.get("/user-create", async (req, res) => {
    const user = new User({username: "userTest"});

    await user.save().then(() => console.log("User created"));

    res.send("User created \n");
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);

    connectDb().then(() => {
        console.log("MongoDb connected");
    });
});
