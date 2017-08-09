var Comment=require('../model/comment');
var User=require('../model/user');
var Post=require('../model/post');
var express=require('express');
var router=express.Router();

router.route('/post/:id/comments')
	.get(function(req,res){
		var response={};
		Comment.find({post: { $in:[ObjectId(req.params.id)]}}, function(err,data){
			//Mongo command to fetch all data from collection.
			if(err){
				response={"err": true, "message": "Error fetching data "};
			}else{
				response={"error": false, "message" : data};
			}
			res.json(response);
		});
	});

router.route("/post/:id/comment")
	.get(function(req,res){

	})
	.post(function(req,res){
		var comment=new Comment(req.body);

		Post.findById(req.params.id,function(err,data){
			if(err){
				response={"error ": true, "message" : "Error fetching data"};
			}else{
				comment.post=data
			}
		});
		User.findById(req.body.user,function(err,data){
			if(err){
				response={"error ": true, "message" : "Error fetching data"};
			}else{
				comment.user=data
			}
		});

		comment.createdDate=Date.now();
		
		var response={};

		comment.save(function(err){
			if(err){
				response={"error" : true, "message" : "Error adding data"};
			}else{
				response={"error" : false, "message": "Data added"};
			}
			res.json(response)
		})
	})

router.route("/post/:idpost/comment/:idcomment")
	.get(function(req,res){
		var response={};
		Comment.findById(req.params.idcomment,function(err,data){
			if(err){
				response={"error ": true, "message" : "Error fetching data"};
			}else{data
				response={"error" : false, "message" : data};
			}
			res.json(response);
		});
	})	
	.delete(function(req,res){
		var response={};
		//find the data
		Comment.findById(req.params.idcomment, function(err,data){
			if(err){
				response={"error" : true , "message" : "Error fetching data"};
			}else{
				//data exists, remove it.
				Comment.remove({_id:req.params.id},function(err){
					if(err){
						response={"error" : true, "message" : "Error deleting data"};
					}else{
						response={"error" : true, "message" : "Data associated with " + req.params.id + "is deleted"};
					}
					res.json(response);
				});
			}
		});

	})
module.exports=router;