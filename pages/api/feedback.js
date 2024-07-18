import fs from 'fs';
import path from 'path';
import { resourceUsage } from 'process';
const insertIntoDB = async (collectionname, data) => {
    const mongooseClient = require('mongoose');
    mongooseClient
        .connect("mongodb://localhost:27017/feedback",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

    const db = mongooseClient.connection;
    db.once('open', () => {
        console.log('Connected to MongoDB');

    });
    const { Schema } = mongooseClient.Schema;
    const feedbackSchema = new Schema({
        id: String,
        email: String,
        feedbackcontent: String
    });
    const feeback = mongooseClient.model('feedbackcoll', feedbackSchema);
    const feedbackentry = new feeback(data);
    const result = await feedbackentry.save();
    console.log(result);

    // const dbb = await cleint.db("feedback");
    // const collection = await dbb.collection(collectionname);

    //const res = await collection.insertOne(data);

    //console.log(res);


}
const handler = async (req, res) => {
    if (req.method === 'POST') {
        const emailEntered = req.body.email;
        const feedEntered = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: emailEntered,
            feedback: feedEntered,
        }
        console.log("email received" + newFeedback.email)

        await insertIntoDB("feedbackcoll", newFeedback);
        res.status(200).json({ message: "record inserted successfully" });
    }
    else {
        res.status(200).json({
            message: 'this works'
        })
    }
    return res;
}

export default handler;