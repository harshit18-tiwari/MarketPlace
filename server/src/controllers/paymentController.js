import crypto from "crypto";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Process custom payment
// @route   POST /api/payments/process
// @access  Private
export const processPayment = async (req, res) => {
  try {
    const { productId, quantity, totalAmount, cardNumber, cardHolder, timestamp } = req.body;

    if (!productId || !quantity || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment information"
      });
    }

    // Get product to verify amount
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Verify amount matches
    const calculatedAmount = product.price * quantity;
    if (Math.abs(calculatedAmount - totalAmount) > 0.01) {
      return res.status(400).json({
        success: false,
        message: "Amount mismatch"
      });
    }

    // Generate payment ID and order ID
    const paymentId = `PAY_${crypto.randomBytes(12).toString('hex').toUpperCase()}`;
    const orderId = `ORD_${crypto.randomBytes(12).toString('hex').toUpperCase()}`;

    // Create order in database
    const order = await Order.create({
      user: req.user._id,
      buyer: req.user._id,
      items: [
        {
          product: productId,
          quantity: quantity,
        },
      ],
      totalAmount,
      paymentId,
      orderId,
      paymentStatus: "completed",
      status: "completed",
    });

    await order.populate([
      { path: "buyer", select: "name email" },
      { path: "items.product" },
    ]);

    res.json({
      success: true,
      message: "Payment processed successfully",
      order,
      paymentId,
      orderId
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({
      success: false,
      message: "Payment processing failed",
      error: error.message,
    });
  }
};
