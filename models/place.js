const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
	name: String,
	location: {
		lat: Number,
		lng: Number
	},
	price: Number
});

module.exports = mongoose.model('Place', placeSchema);