var mongoose=require("mongoose");

//Create a schema
var postSchema=new mongoose.Schema({
	id: Number,
	title: String,
	users:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	categories:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'category'
	},
	tags:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'tag'
	}
	createdDate:{type:Date, default:Date.now}
	lastUpdate:{type:Date, default:Date.now},
	active:Boolean,
	content:String


})
//create model if not exists
module.exports=mongoose.model('post', postSchema);
