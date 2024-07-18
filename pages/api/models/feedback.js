const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;

