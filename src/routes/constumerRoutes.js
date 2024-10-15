const express = require('express');
const router = express.Router();
const CostumerData = require('../models/costumerModel');  // Import the CostumerData model
const OrdersData = require('../models/ordersModel')
// Route to get all CostumerData
router.get('/', async (req, res) => {
  try {
    const data = await CostumerData.findAll();  // Use Sequelize to fetch all CostumerData
    res.json(data);
  } catch (error) {
    console.error('Error retrieving CostumerData:', error);
    res.status(500).send('Error retrieving CostumerData from the database');
  }
});
router.get('/:customer_id', async (req, res) => {
  const { customer_id } = req.params;

  try {
    const data = await CostumerData.findByPk(customer_id);  // Find the record by primary key (customer_id)

    if (!data) {
      return res.status(404).send('CostumerData not found');
    }

    res.json(data);  // Return the found record as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error retrieving data from the database');
  }
});
router.get('/:costumer_id/orders', async (req, res) => {
  try {
    const customerId = req.params.costumer_id;
    const orders = await OrdersData.findAll({ where: { costumer_id: customerId } });
    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: 'No orders found for this customer' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Route to insert a new product
router.post('/', async (req, res) => {
  const { username, address, pincode} = req.body;
  
  try {
    const newData = await CostumerData.create({username, address, pincode});  // Use Sequelize to create a new product
    res.json({ message: 'CostumerData added successfully', product: newData });
  } catch (error) {
    console.error('Error inserting Costumer Data:', error);
    res.status(500).send('Error inserting Costumer Data into the database');
  }
});

// Route to update an existing product
router.put('/:costumer_id', async (req, res) => {
  const { id } = req.params;
  const {username, address, pincode} = req.body;

  try {
    const data = await CostumerData.findByPk(id);  // Find data by its primary key (ID)

    if (!data) {
      return res.status(404).send('CostumerData not found');
    }

    // Update the data's details
    data.username = username;
    data.address = address;
    data.pincode = pincode;
    await data.save();  // Save the updated data

    res.json({ message: 'CostumerData updated successfully', data });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data in the database');
  }
});

module.exports = router;
