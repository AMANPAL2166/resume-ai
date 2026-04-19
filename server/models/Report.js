const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeText: { type: String },
  jobDescription: { type: String },
  matchPercentage: { type: Number },
  missingSkills: [String],
  suggestions: [String],
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);