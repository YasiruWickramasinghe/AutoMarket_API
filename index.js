const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const userRoutes = require('./src/routes/userRoutes');
const vehicleRoutes = require('./src/routes/vehicleRoutes');

dotenv.config();

const app = express();

// Middleware for parsing JSON body
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
