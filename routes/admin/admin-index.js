var express = require('express');
var router = express.Router();
var mySqlCalls = require('../apis/mySqlCalls');

/* GET home page. */
router.get('/', function(req, res, next) {
function callback(err,results){
  var facultyId = req.session.facultyId;
  console.log("you just sent " + facultyId);
  res.render('admin/index', { title: 'Express', type:"index", data:results, authType:facultyId, departmentId:req.session.departmentId });
}
mySqlCalls.getDepartmentInfo(callback);
});

router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Express', type:"login" });
});


module.exports = router;
