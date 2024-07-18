const Feedback = require('../models/feedback');

exports.createFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error creating feedback', error });
    }
};

exports.getFeedbackByEmail = async (req, res) => {
    try {
        const feedback = await Feedback.findOne({ email: req.params.email });
        if (feedback) {
            res.status(200).json(feedback);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback', error });
    }
};