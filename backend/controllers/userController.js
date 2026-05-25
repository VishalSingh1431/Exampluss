const prisma = require('../prismaClient');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        bookmarks: { include: { exam: true } },
        history: { include: { exam: true } }
      }
    });
      
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { otp, otpExpiry, ...userProfile } = user;
    
    userProfile._id = userProfile.id;
    userProfile.bookmarks = userProfile.bookmarks.map(b => ({ ...b, _id: b.id, exam: { ...b.exam, _id: b.exam.id } }));
    userProfile.history = userProfile.history.map(h => ({ ...h, _id: h.id, exam: { ...h.exam, _id: h.exam.id } }));
    
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleBookmark = async (req, res) => {
  try {
    const { paperId } = req.body;
    const userId = req.user.id || req.user._id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { bookmarks: true }
    });
    
    const hasBookmark = user.bookmarks.some(b => b.id === paperId);
    
    let updatedUser;
    if (hasBookmark) {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { bookmarks: { disconnect: { id: paperId } } },
        include: { bookmarks: true }
      });
    } else {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { bookmarks: { connect: { id: paperId } } },
        include: { bookmarks: true }
      });
    }
    
    res.json({ bookmarks: updatedUser.bookmarks.map(b => b.id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addHistory = async (req, res) => {
  try {
    const { paperId } = req.body;
    const userId = req.user.id || req.user._id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { history: true }
    });
    
    const hasHistory = user.history.some(h => h.id === paperId);
    if (hasHistory) {
      await prisma.user.update({
        where: { id: userId },
        data: { history: { disconnect: { id: paperId } } }
      });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { history: { connect: { id: paperId } } },
      include: { history: true }
    });
    
    if (updatedUser.history.length > 20) {
      const toRemove = updatedUser.history[0].id;
      await prisma.user.update({
        where: { id: userId },
        data: { history: { disconnect: { id: toRemove } } }
      });
    }
    
    res.json({ history: updatedUser.history.map(h => h.id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
