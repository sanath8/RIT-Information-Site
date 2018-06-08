var express = require('express');
var sqlApi = require('../../back-end/sqlAPI');
var router = express.Router();
var sqlExecute = require('../apis/mySqlCalls');
var generateexcel = require('../../back-end/excelGenerator');
var utility = require('../utilities');


/* GET home page. */

router.use('/department-reports', require('./department-reports'));

router.get('/student-info', function(req, res, next) {
  if(req.query.departmentId){
    departmentId = req.query.departmentId;
  } else{
    departmentId = req.session.departmentId;
  }
  // var callback = function(err, result){
  //   if(err)
  //     throw err;
  //   res.render('department/student-info', {type:"student-info", data:{}});
  // }
  // sqlExecute.getTwoTables(callback, 'studentPublications', 'studentAchievements');
  res.render('department/student-info', { departmentId: departmentId, type:"student-info", data:{
    studentPublications: [],
    studentAchievements: []
  }, authType:req.session.facultyId, GetParam:req.query.departmentId });

});

router.get('/infrastructure-details', function(req, res, next) {
  if(req.query.departmentId){
    departmentId = req.query.departmentId;
  } else{
    departmentId = req.session.departmentId;
  }
  // var callback = function(err, result1, result2){
  //   if(err)
  //     throw err;
  //   res.render('department/infrastructure-details', {type:"infrastructure-details", resultSet1:result1, resultSet2:result2});
  // }
  // sqlExecute.getTwoTables(callback, 'hardware', 'software');
  res.render('department/infrastructure-details', { departmentId: departmentId, type:"infrastructure-details", data:{
    hardware: [],
    software: []
  }, authType:req.session.facultyId, GetParam:req.query.departmentId });

});

router.get('/activities', function(req, res, next) {
  if(req.query.departmentId){
    departmentId = req.query.departmentId;
  } else{
    departmentId = req.session.departmentId;
  }
  res.render('department/activities', { departmentId: departmentId, type: 'activities', data:{}, authType:req.session.facultyId, GetParam:req.query.departmentId
});
});

router.get('/admission-details', function(req, res, next) {
  if(req.query.departmentId){
    departmentId = req.query.departmentId;
  } else{
    departmentId = req.session.departmentId;
  }
  res.render('department/admission-details', { departmentId: departmentId, type: 'admission-details', data:{}, authType:req.session.facultyId, GetParam:req.query.departmentId  });
});

router.get('/bosboe', function(req, res, next) {
  if(req.query.departmentId){
    departmentId = req.query.departmentId;
  } else{
    departmentId = req.session.departmentId;
  }
  res.render('department/bosboe', { departmentId: departmentId, type:'bosboe', data:{}, authType:req.session.facultyId , GetParam:req.query.departmentId });
});

router.get('/getExcel', function(req, res, next){
	res.setHeader('Content-Type', 'application/json');

	utility.checkSesssion(req, res);
	  console.log('here');
	    var query = req.cookies['query'];
			console.log("Here is my query:" + query);

	    var callBack = function(result)
			{
	        generateexcel.getExcelSheet(result, "Report.xls", res);
	    }
	    console.log(Array(req.body.whereOption));
	    sqlExecute.executeDirectQuery(query, callBack);

	    //sqlExecute.getJointFacultyInfo(callBack, req.params.tableName);*/

});



router.get('/', function(req, res, next) {
  if(req.query.departmentId){
    var departmentId = req.query.departmentId;
  } else{
    var departmentId = req.session.departmentId;
  }
  var callback = function(err,result){
    if(err){
      throw err;
    }
    var data=[];
		for(var i=0;i<result.length;i++){
			var myR={};
      tresult=result[i];
      myR["Fid"] = tresult["facultyId"];
			myR["Name"]=tresult["facultyName"];
			myR["Gender"]=tresult["gender"];
			myR["Address"]=tresult["address"];
			myR["Nature of Appointment"]=tresult["natureOfAppointment"];
			myR["Contact No."]=tresult["contactNumber"];
			myR["Email Id"]=tresult["emailId"];
			data.push(myR);
    }
    var newResult = {'faculty' : data};
    res.render('department/index', {departmentId: departmentId, type:'index', data:{departmentGeneralInfo:newResult['faculty']},
    index:{
      url:"/faculty/",
      departmentGeneralInfo:{
        facultyName:"facultyName",
        gender:"gender",
        address:"address",
        atureOfAppointment:"Nature Of Appointment",
        contactNumber:"Contact No.",
        emailId:"Email Id"
      }
    },
    authType:req.session.facultyId, GetParam:req.query.departmentId });
  }
  sqlExecute.getDepartmentFacultyInfo(callback,departmentId);
});

router.get('/generateexcel/:tableNo/:index/',function(req,res,next){
  if(!utility.checkSesssion(req, res)) return;
  console.log("this is " + req.params.facultyTable);
  var map=["", "", "", "", "", "",""];
  var index = req.params.index;
  if(req.query.departmentId){
	  var dId = req.query.departmentId;
  } else{
	  var dId = req.session.departmentId;
  }

  var tableno = parseInt(req.params.tableNo)-1;
  var callback=function(err, result){
	if(index == 1 || index == 2 || index == 3){
		generateexcel.getExcelSheet(result,map[tableno] + ".xls",res);
	} else{
		generateexcel.getExcelSheet(result[map[tableno]],map[tableno]+ ".xls",res);
	}
	if(err || result.length==0){
		console.log("It reached in error");
		throw err;
	}
	}

  if(index == 1){
	sqlExecute.getDepartmentFacultyInfo(callback,dId);
	map[0]="department_faculty_details";
  }
  if(index == 2){
	sqlExecute.getFaultyQualification(fid,callback);
	map[0]="faculty_qualification_details";
  }
  if(index == 3){
	  map[0] = "faculty_service_details";
	  sqlExecute.getFacultyService(fid,callback);
  }
  if(index == 4){
	  map[0] = "faculty_workshop_fdp";
	  map[1] = "faculty_conference_symposia";
	  map[2] = "faculty_guest_lecture";
	  map[3] = "book";
	  map[4] = "book_chapter";
	  map[5] = "conference_paper";
	  map[6] = "journal_paper";
	  sqlExecute.getFaultyAchievements(fid,callback);
  }
  if(index == 5){
	map[0] = "courses_handled";
	map[1] = "projects_handled";
	map[2] = "faculty_research";
	map[3] = "phd_scholar";
	  sqlExecute.getFaultyAcademics(fid,callback);
  }
  if(index == 6){
	map[0] = "funded_projects";
	map[1] = "faculty_patent";
	map[2] = "consultancy";
	map[3] = "industrial_collaboration_mou";
	  sqlExecute.getFaultyRND(fid,callback);
  }
});


module.exports = router;
