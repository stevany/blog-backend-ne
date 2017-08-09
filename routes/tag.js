var Tag=require('../model/tag');
var express=require('express');
var router=express.Router();

router.route('/tags')
	.get(function(req,res){
		var response={};
		Tag.find({}, function(err,data){
			//Mongo command to fetch all data from collection.
			if(err){
				response={"err": true, "message": "Error fetching data "};
			}else{
				response={"error": false, "message" : data};
			}
			res.json(response);
		});
	});

router.route("/tag")
	.get(function(req,res){

	})
	.post(function(req,res){
		var tag=new Tag(req.body);
		var response={};

		tag.save(function(err){
			if(err){
				response={"error" : true, "message" : "Error adding data"};
			}else{
				response={"error" : false, "message": "Data added"};
			}
			res.json(response)
		})
	})

router.route("/tag/:id")
	.get(function(req,res){
		var response={};
		Tag.findById(req.params.id,function(err,data){
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
		Tag.findById(req.params.id,function(err,data){
			if(err){
				response={"error": true, "message" : "Error fetching data"};
			}else{
				//data exists
				if(req.body.name!==undefined){
					data.name=req.body.name;
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
		Tag.findById(req.params.id, function(err,data){
			if(err){
				response={"error" : true , "message" : "Error fetching data"};
			}else{
				//data exists, remove it.
				Tag.remove({_id:req.params.id},function(err){
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