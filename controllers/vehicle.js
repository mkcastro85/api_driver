const User = require('../models/users');
const multer = require('multer');
const path = require('path');

function createVehicle(req, res, next) {
 
    User.findById(req.params.id, (err, user) => {
      if (err)
        return res.status(500).send({ message: `error when finding the document db: [${err}]` });

      console.log(req.body.left);
      user.set({ 
        temporal : false,
        vehicle: {
          photos: {
            left: req.body.left ,
            right: req.body.right,
            front: req.body.front,
            rear: req.body.rear 
          }
        }
       });

      user.save((err, userModified) => {
        if (err)
          return res.status(500).send({ message: `error when saving the image in the db: [${err}]` });
        res.status(200).send({ user: userModified });
      });
    });
   
}


function updateActiveVehicle(req, res) {
   User.findById(req.params.id, (err, user) => {
        if (err)
        return res.status(500).send({ message: `error when finding the document db: [${err}]` });
        user.set({
          active : req.body.active, 
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