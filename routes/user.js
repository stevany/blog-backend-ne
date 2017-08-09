var User=require('../model/user');
var Role=require('../model/role')
var express=require('express');
var router=express.Router();

router.route('/users')
	.get(function(req,res){
		var response={};
		User.find({}, function(err,data){
			//Mongo command to fetch all data from collection.
			if(err){
				response={"err": true, "message": "Error fetching data "};
			}else{
				response={"error": false, "message" : data};
			}
			res.json(response);
		});
	});

router.route("/user")
	.get(function(req,res){

	})
	.post(function(req,res){
		var user=new User(req.body);

		Role.findById(req.body.role,function(err,data){
			if(err){
				response={"error ": true, "message" : "Error fetching data"};
			}else{
				user.role=data
			}
		});
		user.created_at=Date.now();
		user.updated_at=Date.now();
		var response={};

		user.save(function(err){
			if(err){
				response={"error" : true, "message" : "Error adding data"};
			}else{
				response={"error" : false, "message": "Data added"};
			}
			res.json(response)
		})
	})

router.route("/user/:id")
	.get(function(req,res){
		var response={};
		User.findById(req.params.id,function(err,data){
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
		User.findById(req.params.id,function(err,data){
			if(err){
				response={"error": true, "message" : "Error fetching data"};
			}else{
				//data exists
				if(req.body.name!==undefined){
					data.name=req.body.name;
				}
				if(req.body.username!==undefined){
					data.username=req.body.username
				}
				if(req.body.password!==undefined){
					data.password=req.body.password
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
		User.findById(req.params.id, function(err,data){
			if(err){
				response={"error" : true , "message" : "Error fetching data"};
			}else{
				//data exists, remove it.
				User.remove({_id:req.params.id},function(err){
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