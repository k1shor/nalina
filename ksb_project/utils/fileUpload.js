const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination = 'public';
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext) + uniqueSuffix + ext;
    cb(null, filename);
  }
});

// Optional: File filter for allowed file types (uncomment if needed)
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg)$/i)) {
    cb(new Error("Invalid file format. Only JPG/JPEG files are allowed."), false);
  } else {
    cb(null, true);
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000 // 2 MB
  },
  // Optional: Uncomment to use the file filter
  fileFilter: fileFilter
});
