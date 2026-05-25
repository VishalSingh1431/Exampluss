const prisma = require('../prismaClient');

exports.createExam = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const exam = await prisma.exam.create({
      data: { name, description, category }
    });
    res.status(201).json({ ...exam, _id: exam.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const exam = await prisma.exam.findUnique({ where: { id: req.params.id } });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    
    await prisma.paper.deleteMany({ where: { examId: req.params.id } });
    await prisma.exam.delete({ where: { id: req.params.id } });
    
    res.json({ message: 'Exam and associated papers removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPaper = async (req, res) => {
  try {
    const { examId, title, year, isFree } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No PDF file uploaded' });
    const paperUrl = req.file.path;

    const exam = await prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const paper = await prisma.paper.create({
      data: {
        examId,
        title,
        year: parseInt(year),
        paperUrl,
        isFree: isFree === 'true' || isFree === true
      }
    });

    res.status(201).json({ ...paper, _id: paper.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
