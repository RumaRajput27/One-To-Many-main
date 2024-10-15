const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Import the Sequelize instance
// Define the Product model
const Order_Details = sequelize.define('Order_Details', {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ispurchased: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  costumer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    foreignKey: true
  }
}, {
  tableName: 'orders',  // Define the table name
  timestamps: false       // Disable Sequelize's automatic timestamps (optional)
});
module.exports = Order_Details;