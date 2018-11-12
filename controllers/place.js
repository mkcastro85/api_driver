const Place = require('../models/place');

function createPlace( req, res, next ) {

  console.log('running post method create Place'); // method test!!
  let place = new Place();

  place.name = req.body.name;
  place.location.lat = req.body.lat;
  place.location.lng = req.body.lng;
  place.price = req.body.price;
  console.log(place); // test of creation place

  place.save((err, placeStored) => {
    if (err)
      res.status(500).send({ message: `Error in storing the data [${err}]` }); // send response to error a user
    
    res.status(200).send({ message: 'place creado' }); // send response to user
  });

}

function findPlace(req, res) {
  Place.find({
    }).select({
      name : 1,
      location : 1,
      price: 1
    }).exec((err, place)=>{
        if(err)
          return res.status(500).send({ message: `Error making the request: [${err}]` });
        if(!place)
          return res.status(404).send({ message: 'place doesn\'t disponibles' });

        return res.status(200).send({place: place});
    })
}


module.exports = {
    createPlace,
    findPlace
}