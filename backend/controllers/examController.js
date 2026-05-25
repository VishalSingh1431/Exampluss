const Exam = require('../models/Exam');
const Paper = require('../models/Paper');

// @desc    Get all exams grouped by category
// @route   GET /api/exams
// @access  Public
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({});
    
    // Group exams by category for the frontend
    const groupedExams = exams.reduce((acc, exam) => {
      if (!acc[exam.category]) {
        acc[exam.category] = [];
      }
      acc[exam.category].push(exam);
      return acc;
    }, {});

    res.json(groupedExams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get exam by ID with its papers
// @route   GET /api/exams/:id
// @access  Public
exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    const papers = await Paper.find({ exam: req.params.id }).sort({ year: -1 });
    res.json({ exam, papers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
