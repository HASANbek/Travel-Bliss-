const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Ensure public/uploads/tours directory exists
const tourUploadDir = path.join(__dirname, '../../public/uploads/tours');
if (!fs.existsSync(tourUploadDir)) {
    fs.mkdirSync(tourUploadDir, { recursive: true });
}

// Configure storage (general uploads)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename: timestamp + original name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
        cb(null, name + '-' + uniqueSuffix + ext);
    }
});

// Configure storage for tour images
const tourStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tourUploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename: timestamp + original name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
        cb(null, name + '-' + uniqueSuffix + ext);
    }
});

// File filter - only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

// Configure multer (general)
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Configure multer for tour images
const uploadTourImage = multer({
    storage: tourStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

module.exports = upload;
module.exports.uploadTourImage = uploadTourImage;
