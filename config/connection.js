const mongoose = require('mongoose');

mongoose.connect('mongodb://ds141633.mlab.com:41633/apidriver', (err, res)=>{
    if(err) throw err;
    console.log('established connection');
});
mongodb://<dbuser>:<dbpassword>@ds141633.mlab.com:41633/apidriver

/*mongoose.connect('mongodb://tecnomapsm:tecno@ds141960.mlab.com:41960/schema_tecnomapsm', (err, res)=>{
    if(err) throw err;
    console.log('established connection');
});*/


module.exports = mongoose;
