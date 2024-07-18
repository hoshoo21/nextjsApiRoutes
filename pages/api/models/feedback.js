const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
});

const Feedback = mongoose.models.feedback || mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;

