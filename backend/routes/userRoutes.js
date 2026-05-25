const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUserProfile, toggleBookmark, addHistory } = require('../controllers/userController');

router.get('/profile', protect, getUserProfile);
router.post('/bookmark', protect, toggleBookmark);
router.post('/history', protect, addHistory);

module.exports = router;
