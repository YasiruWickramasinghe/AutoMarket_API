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

// Get vehicle by User ID
const getVehicleByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const vehicle = await Vehicle.find({ userId: userId });

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
  try{
    // Retrieve the user ID from the request object 
    const userId = req.user.id;

    // Retrieve the vehicle details from the request body
    const { manufacturer, model, year, price, desc } = req.body;

    const vehicle = new Vehicle({
      manufacturer, 
      model, 
      year, 
      price, 
      desc,
      userId
    });

    await vehicle.save();

    res.status(201).json({ message: 'Vehicle created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};

// Update vehicle by ID
const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { manufacturer, model, year, price, desc } = req.body;

  try {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if the logged-in user is the owner of the vehicle or an admin
    if (vehicle.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Update the vehicle details
    vehicle.manufacturer = manufacturer;
    vehicle.model = model;
    vehicle.year = year;
    vehicle.price = price;
    vehicle.desc = desc;

    const updatedVehicle = await vehicle.save();
    res.status(200).json({ message: 'Vehicle updated successfully', data: updatedVehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete vehicle by ID
const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if the logged-in user is the owner of the vehicle or an admin
    if (vehicle.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

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

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle, searchVehicles, getVehicleByUserId };
