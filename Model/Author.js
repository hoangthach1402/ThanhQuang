const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
   
    },
    age:{
        type:String,
        required:true,
    
    },
  
   
});

//Export the model
module.exports = mongoose.model('Author', authorSchema);