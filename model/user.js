var mongoose=require("mongoose");

//Create a schema
var userSchema=new mongoose.Schema({
	id: Number,
	name: String,
	username:{type:String, required:true, unique:true},
	password:{type:String, required:true},
	created_at:Date,
	updated_at:Date,
	active:Boolean,

	roles:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'role'
	}
})
//create model if not exists
module.exports=mongoose.model('user', userSchema);
