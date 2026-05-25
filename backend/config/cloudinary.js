const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'exampluss_papers',
    // Accept pdfs
    allowed_formats: ['pdf'],
    // Use raw resource type for PDFs
    resource_type: 'raw', 
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
