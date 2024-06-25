const Order = require("../models/order");
const Item = require("../models/item");

const { generateSessionItem } = require("../middleware/generateSessionItem");

const getOrders = async (user) => {
  const orders = await Promise.all(
    user.orders.map(async (orderID) => {
      const order = await Order.findById(orderID).exec();
      return order;
    })
  );

  return orders;
};

const getOrderItems = async (order) => {
  const items = await Promise.all(
    order.items.map(async (itemID) => {
      const item = await Item.findById(itemID).exec();
      return item;
    })
  );

  return items;
};

const getUserOrderItems = async (orders) => {
  const orderItems = await Promise.all(
    orders.map(async (order) => {
      const items = await getOrderItems(order);
      return items;
    })
  );

  return orderItems;
};

const getOrderTokens = (items) => {
  const responseOrderItems = items.map((item) => {
    return generateSessionItem(item);
  });

  return responseOrderItems;
};

const getAllOrderTokens = (orderItems) => {
  const responseOrders = orderItems.map((items) => {
    return getOrderTokens(items);
  });

  return responseOrders;
};

const generateOrderInfo = (items, order) => {
  const orderInfo = {
    name: order.name,
    country: order.country,
    state: order.state,
    zip: order.zip,
    orderDate: order.orderDate,
    items: items,
  };

  return orderInfo;
};

module.exports = {
  getOrders,
  getOrderItems,
  getUserOrderItems,
  getOrderTokens,
  getAllOrderTokens,
  generateOrderInfo,
};
