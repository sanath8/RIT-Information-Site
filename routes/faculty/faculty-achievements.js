var express = require('express');
var router = express.Router();
var sqlExecute = require('../apis/mySqlCalls');
var utility = require('../utilities');

router.get('/', function(req, res, next) {
	if(!utility.checkSesssion(req, res)) return;
	var callback = function(err, data){
		if(err)
			throw err;
		res.render('faculty/achievements', {title : "Faculty Achievement Details",type : "achievements", data:data});
	}
	//TODO Change the Faculty Achievements Table
	sqlExecute.getFaultyAchievements(req.session.facultyId, callback);
});

module.exports=router;