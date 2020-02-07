import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    size: {
        type: Number
    }
});

export const Node = mongoose.model("Node", nodeSchema);
