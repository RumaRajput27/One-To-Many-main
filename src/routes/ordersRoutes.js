const express = require('express');
const router = express.Router();
const OrdersData = require('../models/ordersModel');  // Import the OrdersData model

// Route to get all tableData
router.get('/', async (req, res) => {
  try {
    const data = await OrdersData.findAll();  // Use Sequelize to fetch all data
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data from the database');
  }
});

// Route to insert a new product
router.post('/', async (req, res) => {
  const {item, price, ispurchased, costumer_id} = req.body;
  
  try {
    const newData = await OrdersData.create({item, price, ispurchased, costumer_id});  // Use Sequelize to create a new data
    res.json({ message: 'OrdersData added successfully', product: newData });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data into the database');
  }
});
router.get('/:order_id', async (req, res) => {
  const { order_id } = req.params;

  try {
    const data = await OrdersData.findByPk(order_id);  // Find the record by primary key (customer_id)

    if (!data) {
      return res.status(404).send('OrdersData not found');
    }

    res.json(data);  // Return the found record as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error retrieving data from the database');
  }
});
// Route to update an existing product
router.put('/:order_id', async (req, res) => {
  const { id } = req.params;
  const {item, price, ispurchased, costumer_id} = req.body;

  try {
    const data = await OrdersData.findByPk(id);  // Find data by its primary key (ID)

    if (!data) {
      return res.status(404).send('OrdersData not found');
    }

    // Update the data's details
    data.item = item;
    data.price = price;
    data.ispurchased = ispurchased;
    data.costumer_id = costumer_id;
    await data.save();  // Save the updated data

    res.json({ message: 'OrdersData updated successfully', data });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data in the database');
  }
});

module.exports = router;
