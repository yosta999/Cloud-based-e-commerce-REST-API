const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
  try {
    const order = new Order({ ...req.body, userId: req.user.userId });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate('products');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
