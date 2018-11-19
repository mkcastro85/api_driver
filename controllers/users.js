const User = require('../models/users');
const sendMail = require('../config/mailer');
const services = require('../services');

function signUp(req, res, next) {

    console.log('running post method create user'); // method test!!
    let user = new User();
    user.name_completed = req.body.name_completed;
    user.id = req.body.id;
    user.mail = req.body.mail;
    user.cellphone = req.body.cellphone;
    user.rol = req.body.rol;
    user.location.lat = req.body.lat;
    user.location.lng = req.body.lng;
    if (req.body.rol === 'driver') {
        if (req.body.id_motorcycle !== '') {
            user.vehicle.id_motorcycle = req.body.id_motorcycle;
        } else {
            return res.status(400).send({message: `The param has an invalid value`});
        }
    }
    user.password = Math.random().toString(36).substring(8).toUpperCase();

    console.log(user); // test of creation user

    user.save((err, userStored) => {
        if (err)
            res.status(500).send({message: `Error in storing the data [${err}]`}); // send response to error a user
        sendMail(userStored.mail, userStored.password); // send mail to user
        res.status(200).send({message: 'usaurio creado'}); // send response to user
    });

}

function signIn(req, res) {

    console.log('running post method for start sesion');
    let mail = req.body.mail;
    let pass = req.body.password;

    User.findOne({mail: mail, password: pass}, (err, user) => {
        if (err)
            return res.status(500).send({message: `Error making the request: [${err}]`});
        if (!user)
            return res.status(404).send({message: 'user doesn\'t exist'});

        req.user = user
        res.status(200).send({
            token: services.createToken(user),
            user: user
        });
    });

}


function findLocation(req, res) {
    User.find({
        active: true
    }).select({
        name_completed: 1,
        location: 1
    }).exec((err, location_driver) => {
        if (err)
            return res.status(500).send({message: `Error making the request: [${err}]`});
        if (!location_driver)
            return res.status(404).send({message: 'driver doesn\'t disponibles'});

        return res.status(200).send({location: location_driver});
    })
}

function calificar(req, res) {
    User.findById(req.params.id, (err, user) => {
        if (err)
            return res.status(500).send({message: `error when finding the document db: [${err}]`});
        user.calificacion.push({content: req.body.calificar});

        user.save((err, userModified) => {
            if (err)
                return res.status(500).send({message: `error when saving the location in the db: [${err}]`});
            res.status(200).send({user: userModified});
        });
    });
}

module.exports = {
    signUp,
    signIn,
    findLocation,
    calificar
}