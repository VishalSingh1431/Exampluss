const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createExam, deleteExam, addPaper } = require('../controllers/adminController');
const { upload } = require('../config/cloudinary');

router.post('/exams', protect, admin, createExam);
router.delete('/exams/:id', protect, admin, deleteExam);
// Add the upload middleware to accept a single file named 'pdfFile'
router.post('/papers', protect, admin, upload.single('pdfFile'), addPaper);

module.exports = router;
