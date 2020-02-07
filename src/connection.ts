import mongoose from 'mongoose';

const connection = "mongodb://mongo:27017/mongo-test";

export const connectDb = () => {
    return mongoose.connect(connection);
};


