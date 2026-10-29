const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/img');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' ||
       file.mimetype === 'image/png' ||
       file.mimetype === 'image/jpg') {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.mimetype.replace('/', '.'));
    } else {
      return cb(new Error('Solo se permiten archivos JPEG, PNG y JPG'));
    }
  }
});

const uploadImagen = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' ||
       file.mimetype === 'image/png' ||
       file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos JPEG, PNG y JPG'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamaño de archivo a 5MB
});

module.exports = { uploadImagen };