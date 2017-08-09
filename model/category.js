var mongoose=require("mongoose");

//Create a schema
var categorySchema=new mongoose.Schema({
	id: Number,
	name: String
})
//create model if not exists
module.exports=mongoose.model('category', categorySchema);
