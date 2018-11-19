const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const califications = new mongoose.Schema({
    content: String,
});
const userSchema = new Schema({
    active: {
        type: Boolean,
        default: false
    },
    name_completed: String,
    cellphone:String,
    id: String,
    mail: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    profile_photo: {
        type: String, 
        default: 'images/default.png'},
    temporal: {
        type: Boolean, 
        default: true
    },
    rol: {
        type:String,  
        enum: ['user', 'driver']
    },
    vehicle: {
        id_motorcycle:String,
        photos:{
            left: String,
            right: String,
            front: String,
            rear: String
        }
    },
    calificacion: [],
    location: {
        lat: Number,
        lng: Number
    },
    
    
});


module.exports = mongoose.model('User', userSchema);
