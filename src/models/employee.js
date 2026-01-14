const mongoose= require('mongoose');
const employeeSchema= new mongoose.Schema({
    name:String,
    password:String,
    address:String
});
module.exports= mongoose.model('Employee',employeeSchema);