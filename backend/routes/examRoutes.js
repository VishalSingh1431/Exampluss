const express = require('express');
const router = express.Router();
const { getAllExams, getExamById } = require('../controllers/examController');

router.get('/', getAllExams);
router.get('/:id', getExamById);

module.exports = router;
