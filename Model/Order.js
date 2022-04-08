const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  
    userId:{
        type:String,
        required:true,
    },
    productId:String,
    payying:Int,
    
});
  

//Export the model
module.exports = mongoose.model('order', orderSchema);