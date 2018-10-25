const express = require('express');
const mongoose = require('../config/connection');

const userController = require('../controllers/users');
const vehicleController = require('../controllers/vehicle');
const auth = require('../middlewares/auth'); 

const router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/locations', userController.findLocation);

router.post('/sign-up', userController.signUp);

router.post('/sign-in', userController.signIn);

router.put('/vehicle/:id', vehicleController.createVehicle);

router.put('/active-vehicle/:id', vehicleController.updateActiveVehicle);

router.get('/private', auth.isAuth, (req, res)=>{
  res.status(200).send({message:'estas autenticado'});
})


module.exports = router;
