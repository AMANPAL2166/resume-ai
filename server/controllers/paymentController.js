const crypto   = require('crypto');
const razorpay = require('../services/razorpay');
const Payment  = require('../models/Payment');
const Report   = require('../models/Report');

// @route POST /api/payment/create-order
const createOrder = async (req, res) => {
  try {
    const { reportId, amount } = req.body;
    console.log('💳 Order create ho raha hai:', { reportId, amount });

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report nahi mili' });
    }

    if (report.isPaid) {
      return res.status(400).json({ message: 'Report pehle se unlock hai!' });
    }

    // Razorpay order
    const order = await razorpay.orders.create({
      amount:   amount * 100,
      currency: 'INR',
      receipt:  `rcpt_${Date.now()}`,  // ✅ short receipt
      notes: {
        reportId: reportId.toString(),
        userId:   req.user._id.toString()
      }
    });

    console.log('✅ Order created:', order.id);

    // DB mein save karo
    await Payment.create({
      user:            req.user._id,
      report:          reportId,
      razorpayOrderId: order.id,
      amount:          amount,
      status:          'pending'
    });

    res.json({
      success:  true,
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      keyId:    process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('❌ Order error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/payment/verify
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      reportId
    } = req.body;

    console.log('🔐 Payment verify ho raha hai:', razorpay_payment_id);

    // Signature verify — security ke liye zaruri!
    const body      = razorpay_order_id + '|' + razorpay_payment_id;
    const expected  = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      console.error('❌ Invalid signature!');
      return res.status(400).json({ message: 'Payment verify nahi hua!' });
    }

    console.log('✅ Signature valid!');

    // Payment update karo
    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        status: 'success'
      }
    );

    // Report unlock karo
    const report = await Report.findByIdAndUpdate(
      reportId,
      { isPaid: true },
      { new: true }
    );

    console.log('🎉 Report unlock ho gayi:', reportId);

    res.json({
      success: true,
      message: 'Payment successful! Report unlock ho gayi 🎉',
      data: {
        matchPercentage: report.matchPercentage,
        missingSkills:   report.missingSkills,
        suggestions:     report.suggestions,
        isPaid:          true
      }
    });

  } catch (error) {
    console.error('❌ Verify error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, verifyPayment };