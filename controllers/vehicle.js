const User = require('../models/users');
const multer = require('multer');
const path = require('path');

function createVehicle(req, res, next) {
    console.log('ejecutando metodo post crear vehiculo conductor');
    const storage = multer.diskStorage({
      destination: `public/images/${req.params.id}`,
      filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now() + '-' + path.extname(file.originalname));
      }
    })
  
    // init upload
    const upload = multer({
      storage: storage,
      limits: { fileSize: 3000000 },
      fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
      }
    }).any([]);
  
    // Change file type
    function checkFileType(file, cb) {
      // allowed ext
      const filetypes = /jpg|png|jpeg|gif/;
      // check ext
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      //check mime
      const mimetype = filetypes.test(file.mimetype);
  
      if (extname && mimetype)
        return cb(null, true);
      else
        cb('error only images!');
    }
  
    upload(req, res, (err) => {
      if (err)
        res.status(500).send({ message: `Error saving the image in the path: [${err}]` });
  
      User.findById(req.params.id, (err, user) => {
        if (err)
        return res.status(500).send({ message: `error when finding the document db: [${err}]` });
        user.set({ 
          vehicle: {
            photos: {
              left: `\/${req.files[0].destination}\/${req.files[0].filename}`,
              right: `\/${req.files[1].destination}\/${req.files[1].filename}`,
              front: `\/${req.files[2].destination}\/${req.files[2].filename}`,
              rear: `\/${req.files[3].destination}\/${req.files[3].filename}`
            }
          }
         });
        user.save((err, userModified) => {
          if (err)
            return res.status(500).send({ message: `error when saving the image in the db: [${err}]` });
          res.status(200).send({ user: userModified });
        });
      });
    });
}


function updateActiveVehicle(req, res) {
   User.findById(req.params.id, (err, user) => {
        if (err)
        return res.status(500).send({ message: `error when finding the document db: [${err}]` });
        user.set({
          active : true, 
          location: {
            lat : req.body.lat,
            lng: req.body.lng
          }
         });
        user.save((err, userModified) => {
          if (err)
            return res.status(500).send({ message: `error when saving the location in the db: [${err}]` });
          res.status(200).send({ user: userModified });
        });
      });
}


module.exports = {
    createVehicle,
    updateActiveVehicle
}