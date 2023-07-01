const Vehicle = require('../models/vehicleModel');

// Get all vehicles with pagination, search, sorting, and filtering
const getVehicles = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, filter, search } = req.query;
    const query = {};

    // Apply filtering
    if (filter) {
      const filters = JSON.parse(filter);
      Object.assign(query, filters);
    }

    // Apply search
    if (search) {
      query.$or = [
        { manufacturer: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
      ];
    }

    // Get total count for pagination
    const totalCount = await Vehicle.countDocuments(query);

    // Apply sorting
    const sortOptions = sort ? JSON.parse(sort) : { createdAt: -1 };

    const vehicles = await Vehicle.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: vehicles,
      totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get vehicle by ID
const getVehicleById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new vehicle
const createVehicle = async (req, res) => {
  const { manufacturer, model, year, price, contact  } = req.body;
  try {
    const newVehicle = await Vehicle.create({ manufacturer, model, year, price, contact });
    res.status(201).json({ message: 'Vehicle created successfully'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update vehicle by ID
const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { manufacturer, model, year, price, contact } = req.body;
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, { manufacturer, model, year, price, contact }, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(201).json({ message: 'Vehicle updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete vehicle by ID
const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Search vehicles by name and author
const searchVehicles = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const vehicles = await Vehicle.find({
      $or: [
        { manufacturer: { $regex: searchQuery, $options: 'i' } },
        { model: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle, searchVehicles };
