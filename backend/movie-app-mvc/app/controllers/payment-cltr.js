import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: 'rzp_test_65QeCr4YwXFMbS',
    key_secret: 'd1QoJnwOWbK96LjTTxxbWZe6',
});

// Create order route
const paymentCltr = async (req, res) => {
    const { amount } = req.body; // Amount in rupees

    const payment_capture = 1;
    const currency = 'INR';
    const options = {
        amount: amount * 100, // Razorpay expects the amount in paise, so multiply by 100 to avoid converting in another step
        currency,
        receipt: `receipt_order_${Date.now()}`,
        payment_capture,
    };
    try {
        const response = await razorpay.orders.create(options);
        res.json({
            id: response.id,
            currency: response.currency,
            amountPaise: response.amount,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default paymentCltr;
