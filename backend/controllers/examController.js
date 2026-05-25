const prisma = require('../prismaClient');

exports.getAllExams = async (req, res) => {
  try {
    const exams = await prisma.exam.findMany();
    
    const groupedExams = exams.reduce((acc, exam) => {
      const formattedExam = { ...exam, _id: exam.id };
      if (!acc[exam.category]) acc[exam.category] = [];
      acc[exam.category].push(formattedExam);
      return acc;
    }, {});

    res.json(groupedExams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const exam = await prisma.exam.findUnique({ where: { id: req.params.id } });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    
    const papers = await prisma.paper.findMany({ 
      where: { examId: req.params.id },
      orderBy: { year: 'desc' }
    });

    const formattedExam = { ...exam, _id: exam.id };
    const formattedPapers = papers.map(p => ({ ...p, _id: p.id }));

    res.json({ exam: formattedExam, papers: formattedPapers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
