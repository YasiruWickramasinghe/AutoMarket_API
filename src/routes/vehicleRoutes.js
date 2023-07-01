const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicles,
} = require('../controllers/vehicleController');

const router = express.Router();

// Get all vehicles with pagination, search, sorting, and filtering
router.get('/', getVehicles);

// Get vehicle by ID
router.get('/:id', getVehicleById);

// Create a new vehicle
router.post(
  '/',
  [
    body('manufacturer').notEmpty().withMessage('Manufacturer is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').notEmpty().withMessage('Year is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('contact.name').notEmpty().withMessage('Contact name is required'),
    body('contact.email').notEmpty().withMessage('Contact email is required').isEmail().withMessage('Invalid email format'),
    body('contact.phone').notEmpty().withMessage('Contact phone is required'),
    // ... add other validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
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
    body('contact.name').notEmpty().withMessage('Contact name is required'),
    body('contact.email').notEmpty().withMessage('Contact email is required').isEmail().withMessage('Invalid email format'),
    body('contact.phone').notEmpty().withMessage('Contact phone is required'),
    // ... add other validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateVehicle
);

// Delete vehicle by ID
router.delete('/:id', deleteVehicle);

// Search vehicles by name
router.get('/search/name', searchVehicles);

module.exports = router;
