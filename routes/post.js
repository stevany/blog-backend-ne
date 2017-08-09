var Post=require('../model/post');
var User=require('../model/user');
var Category=require('../model/category');
var Tag=require('../model/tag');
var express=require('express');
var router=express.Router();

router.route('/posts')
	.get(function(req,res){
		var response={};
		Post.find({}, function(err,data){
			//Mongo command to fetch all data from collection.
			if(err){
				response={"err": true, "message": "Error fetching data "};
			}else{
				response={"error": false, "message" : data};
			}
			res.json(response);
		});
	});

router.route("/post")
	.get(function(req,res){

	})
	.post(function(req,res){
		var post=new Post(req.body);

		//check if it is not null
		User.findById(req.body.user,function(err,data){
			if(err){
				response={"error ": true, "message" : "Error fetching data"};
			}else{
				post.role=data
			}
		});

		Category.findById(req.body.category,function(err,data){
			if(err){
				response={"error ": true, "message" : "Error fetching data"};
			}else{
				post.category=data
			}
		});

		Tag.findById(req.body.tag,function(err,data){
			if(err){
				response={"error ": true, "message" : "Error fetching data"};
			}else{
				post.tag=data
			}
		});
		post.createdDate=Date.now();
		post.lastUpdate=Date.now();
		post.active=true;
		var response={};

		post.save(function(err){
			if(err){
				response={"error" : true, "message" : "Error adding data"};
			}else{
				response={"error" : false, "message": "Data added"};
			}
			res.json(response)
		})
	})

router.route("/post/:id")
	.get(function(req,res){
		var response={};
		Post.findById(req.params.id,function(err,data){
			if(err){
				response={"error ": true, "message" : "Error fetching data"};
			}else{data
				response={"error" : false, "message" : data};
			}
			res.json(response);
		});
	})
	.put(function(req,res){
		var response={};
		//find the data
		Post.findById(req.params.id,function(err,data){
			if(err){
				response={"error": true, "message" : "Error fetching data"};
			}else{
				//data exists
				if(req.body.content!==undefined){
					data.content=req.body.content;
				}
				if(req.body.user!==undefined){
					data.user=req.body.user
				}
				if(req.body.category!==undefined){
					data.category=req.body.category
				}			
				if(req.body.tag!==undefined){
					data.user=req.body.tag
				}
				if(req.body.updated_at!==undefined){
					data.updated_at=Date.now()
				}

				
				//save the data
				data.save(function(err){
					if(err){
						response={"error" : false, "message" : "Data is updated for " + req.params.id};
					}
					res.json(response);
				})
			}
		})
	})
	.delete(function(req,res){
		var response={};
		//find the data
		Post.findById(req.params.id, function(err,data){
			if(err){
				response={"error" : true , "message" : "Error fetching data"};
			}else{
				//data exists, remove it.
				Post.remove({_id:req.params.id},function(err){
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