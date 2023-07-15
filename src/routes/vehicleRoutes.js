const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicles,
  getVehicleByUserId,
} = require('../controllers/vehicleController');
const authenticateUser = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const router = express.Router();

// Get all vehicles with pagination, search, sorting, and filtering
router.get('/', authenticateUser, getVehicles);

// Get vehicle by ID
router.get('/:id', authenticateUser, getVehicleById);

// Get vehicle by User ID
router.get('/user/:userId', authenticateUser, getVehicleByUserId);

// Create a new vehicle
router.post(
  '/',
  [
    body('manufacturer').notEmpty().withMessage('Manufacturer is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').notEmpty().withMessage('Year is required'),
    body('price').notEmpty().withMessage('Price is required'),
    // ... add other validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authenticateUser,
  createVehicle
);

// Update vehicle by ID
router.put(
  '/:id',
  [
    body('manufacturer').notEmpty().withMessage('Manufacturer is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').notEmpty().withMessage('Year is required'),
    body('price').notEmpty().withMessage('Price is required'),
    // ... add other validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  authenticateUser,
  updateVehicle
);

// Delete vehicle by ID
router.delete('/:id', authenticateUser, deleteVehicle);

// Search vehicles by name
router.get('/search/name', authenticateUser, searchVehicles);

module.exports = router;
