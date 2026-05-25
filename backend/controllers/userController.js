const User = require('../models/User');

// @desc    Get user profile (includes populated bookmarks and history)
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({ path: 'bookmarks', populate: { path: 'exam' } })
      .populate({ path: 'history', populate: { path: 'exam' } })
      .select('-otp -otpExpiry');
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle Bookmark for a paper
// @route   POST /api/users/bookmark
// @access  Private
exports.toggleBookmark = async (req, res) => {
  try {
    const { paperId } = req.body;
    const user = await User.findById(req.user._id);
    
    if (user.bookmarks.includes(paperId)) {
      user.bookmarks = user.bookmarks.filter(id => id.toString() !== paperId);
    } else {
      user.bookmarks.push(paperId);
    }
    
    await user.save();
    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add paper to history
// @route   POST /api/users/history
// @access  Private
exports.addHistory = async (req, res) => {
  try {
    const { paperId } = req.body;
    const user = await User.findById(req.user._id);
    
    // Remove if it already exists so we can push to the top
    user.history = user.history.filter(id => id.toString() !== paperId);
    
    // Add to beginning of array
    user.history.unshift(paperId);
    
    // Keep only last 20
    if (user.history.length > 20) {
      user.history.pop();
    }
    
    await user.save();
    res.json({ history: user.history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
