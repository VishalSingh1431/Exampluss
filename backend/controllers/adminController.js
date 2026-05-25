const Exam = require('../models/Exam');
const Paper = require('../models/Paper');

// @desc    Create a new Exam
// @route   POST /api/admin/exams
// @access  Private/Admin
exports.createExam = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const exam = new Exam({ name, description, category });
    const createdExam = await exam.save();
    res.status(201).json(createdExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an Exam
// @route   DELETE /api/admin/exams/:id
// @access  Private/Admin
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    await Exam.findByIdAndDelete(req.params.id);
    // Also delete all associated papers
    await Paper.deleteMany({ exam: req.params.id });
    res.json({ message: 'Exam and associated papers removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a Question Paper to an Exam
// @route   POST /api/admin/papers
// @access  Private/Admin
exports.addPaper = async (req, res) => {
  try {
    const { examId, title, year, isFree } = req.body;
    
    // The Cloudinary URL is automatically attached to req.file.path by multer
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }
    const paperUrl = req.file.path;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    const paper = new Paper({
      exam: examId,
      title,
      year,
      paperUrl,
      isFree: isFree === 'true' || isFree === true
    });

    const createdPaper = await paper.save();
    res.status(201).json(createdPaper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
