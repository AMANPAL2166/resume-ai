const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  report: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  amount: { type: Number },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);