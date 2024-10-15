const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');  // Import the Sequelize instance
// Define the Product model
const Costumer_Details = sequelize.define('Costumer_Details', {
  costumer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pincode: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'costumer',  // Define the table name
  timestamps: false       // Disable Sequelize's automatic timestamps (optional)
});
module.exports = Costumer_Details;