var mongoose=require("mongoose");

//Create a schema
var commentSchema=new mongoose.Schema({
	id: Number,
	users:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	posts:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'post'
	}
	content:String,
	createdDate:{type:Date, default:Date.now}
})
//create model if not exists
module.exports=mongoose.model('comment', commentSchema);