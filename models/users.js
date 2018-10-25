const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        default: 'images/user/default.png'},
    temporal: {
        type: Boolean, 
        default: true
    },
    rol: {
        type:String,  
        enum: ['user', 'driver'], 
        default: 'user'
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
    location: {
        lat: Number,
        lng: Number
    }
    
});

module.exports = mongoose.model('User', userSchema);
