import connectDB from './lib/db';
import Feedback from './models/feedback';
export default async function handler(req, res) {


    await connectDB();
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const { feedbackid } = req.query;
                const feedback = await Feedback.find({ id: feedbackid });
                if (feedback)
                    res.status(200).json({ "feedback": feedback });
                else
                    res.status(200).json({ message: "no feedbacks found" });
                break;

            }
            catch (error) {
                console.log("error occured in GET request", error);
            }
        case "POST":
            try {
                console.log("no fucntionality implemented");
                break;
            }
            catch (error) {
                console.log("error occured in POST request", error);

            }

            defualt:
            console.log("method not supported");

            break;





    }
}