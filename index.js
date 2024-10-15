const express = require('express');
const constumerRoutes = require('./src/routes/constumerRoutes');
const ordersRoutes = require('./src/routes/ordersRoutes');
// Load models and associations
require('./src/models/costumerOrdersRelation');

const app = express();
const port = 4400;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in routes.js
app.use('/costumer', constumerRoutes);
app.use('/orders', ordersRoutes);
// Sync Sequelize models and start the server
const sequelize = require('./src/database/db');  // Import the Sequelize instance

sequelize.sync()  // This creates the table if it doesn't exist
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });
