const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const errorMiddleware = require('./src/middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware for parsing JSON body
app.use(express.json());

// Connect to MongoDB
connectDB();

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
