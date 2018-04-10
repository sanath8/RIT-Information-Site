var express = require('express');
var router = express.Router();
var sqlExecute = require('../apis/mySqlCalls');
var utility = require('../utilities');

router.get('/', function(req, res, next) {
	if(!utility.checkSesssion(req, res)) return;

	var facultyId;
	var auth = true;

	if(!utility.checkGetParam(req,res)){
		facultyId = req.session.facultyId;
	}
	else{
		auth = false;
		facultyId = req.query.fId;
	}

	var callback = function(err, result){
		if(err)
			throw err;
		// var result object below tobe deleted 
		var arr=[];
		for(var i in result){
			var temp={
				facultyId:result[i]["facultyId"],
				type:result[i]["degree"],
				university:result[i]["university"],
				passPercentage:result[i]["passClass"],
				passYear:result[i]["passYear"],
				areaOfSpecialization:result[i]["areaOfSpecialization"]
			};
			arr.push(temp);
		}
		res.render('faculty/qualification', {type:"qualification", data:{ faculty_qualification:arr},
				index : { 
					url:"/faculty/qualification",
       				faculty_qualification:
					{
						type: "Type",
						university: "University",
						passPercentage: "Pass Percentage",
						passYear: "Pass Year",
					}
				},
				GetParam:req.query.fId,
				authType:req.session.facultyId
			});
	}
	//sqlExecute.getWholeTable(callback,'facultyQualification', req.session.email);
	sqlExecute.getFaultyQualification(facultyId, callback);
});

module.exports=router;