// pages/api/feedback.js
import connectDB from './lib/db';
import Feedback from './models/feedback';

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const feedback = new Feedback(req.body);
                const savedFeedback = await feedback.save();
                res.status(201).json(savedFeedback);
            } catch (error) {
                res.status(500).json({ message: 'Error creating feedback', error });
            }
            break;

        case 'GET':
            try {
                const { emailparam } = req.query;
                const feedback = await Feedback.findOne({ email: emailparam });
                if (feedback) {
                    res.status(200).json(feedback);
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
