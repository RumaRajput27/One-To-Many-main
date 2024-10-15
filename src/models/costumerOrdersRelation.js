const Costumer_Details = require('./costumerModel');
const Order_Details = require('./ordersModel');

// Define the associations here
Costumer_Details.hasMany(Order_Details, { foreignKey: 'costumer_id' });
Order_Details.belongsTo(Costumer_Details, { foreignKey: 'costumer_id' });

module.exports = { Costumer_Details, Order_Details };
