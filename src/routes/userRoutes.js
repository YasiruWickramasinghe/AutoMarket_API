const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, getUserProfile, updateUserProfileAndPassword, deleteUserProfile, logoutUser  } = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('phone').trim().notEmpty().withMessage('Invalid phone number'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  registerUser
);

// Login user
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  loginUser
);

//get user
router.get('/profile', authenticateUser, getUserProfile);

//update user
router.put(
  '/profileupdate',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
  ],
  authenticateUser,
  updateUserProfileAndPassword
);

// Delete user profile
router.delete('/profiledelete', authenticateUser, deleteUserProfile);

// Logout user
router.post('/logout', authenticateUser, logoutUser);


// Protected admin route
router.get('/admin', authenticateUser, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin route accessed' });
});



module.exports = router;
