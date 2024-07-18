// pages/api/feedback.js
import connectDB from './lib/db';
import Feedback from './models/feedback';

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const feedbackModel = {
                    id: new Date().toISOString(),
                    email: req.body.email,
                    content: req.body.text
                };
                const feedback = new Feedback(feedbackModel);
                const savedFeedback = await feedback.save();
                res.status(201).json({ "feedback": savedFeedback });
            } catch (error) {
                res.status(500).json({ message: 'Error creating feedback', error });
            }
            break;

        case 'GET':
            try {

                const { email } = req.query;
                let feedback;
                if (!email)
                    feedback = await Feedback.find({});
                else
                    feedback = await Feedback.find({ email: email });
                if (feedback) {
                    res.status(200).json({ "feedback": feedback });
                } else {
                    res.status(404).json({ message: 'Feedback not found' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Error retrieving feedback', error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
