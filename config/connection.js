const mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2:27017/schema_tecnomapsm', (err, res)=>{
    if(err) throw err;
    console.log('established connection');
});

/*mongoose.connect('mongodb://tecnomapsm:tecno@ds141960.mlab.com:41960/schema_tecnomapsm', (err, res)=>{
    if(err) throw err;
    console.log('established connection');
});*/


module.exports = mongoose;
