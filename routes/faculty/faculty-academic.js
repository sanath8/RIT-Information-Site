var express = require('express');
var router = express.Router();
var sqlExecute = require('../apis/mySqlCalls');
var utility = require('../utilities');
var facultyPermissions = require('./faculty-permissions.js');

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


	var callback = function(err, data){
		if(err)
			throw err;
		var facultyID = req.session.facultyId;
		// console.log("GetParam : " + req.session.facultyId);
		// console.log("faculty id : " + facultyID);
		// console.log(JSON.stringify(data));
		res.render('faculty/academic-details', {title : "Faculty Academic Details", type:"academic-details", data:data,
		index : { 
			url:"/faculty/academic-details",
			courses_handled:{ 
				facultyId : "facultyId",
				yearHandled : "Year Handled", 
				subjectName : "Subject Name",
				ugOrPg :  "Ug Or Pg",
				labHandled :  "Lab Handled",                
			   }
		   ,
		   projects_handled:
			   {            
				facultyId : facultyId,
				batch : "Batch",
				ugOrPg : "Ug Or Pg",
				projectTitle : 'Project Title',               
			   }
		   ,
		   faculty_research:
			   {            
				slNo: "Sl No",
				guideName: "Guide Name",
				researchCandidateName:"Research Candidate Name",
				usn:'USN',
				centreName:'Centre Name',
				university:'University',
				registrationYear:'Registration Year',
				title:'Title',
				status:'Status',
				facultyId:facultyId       
			   }
		   ,
		   phd_scholar:
			   {            
				facultyId:facultyId,
				scholarName:'Scholar Name',
				guideName:'Guide Name',
				researchCentre:'Research Centre',
				university:'University',
				registrationYear:'Registration Year',
				usn:'USN',
				title:'Title',
				status:'Status'               
			   }
		      
		},
		hiddenFields:{
			courses_handled:{ 
				slNo: { view: true, insert: true, update: true },
				facultyId : { view: true, insert: true, update: true },
				yearHandled : { view: false, insert: false, update: false }, 
				subjectName : { view: false, insert: false, update: false },
				ugOrPg :  { view: false, insert: false, update: false },
				labHandled :  { view: false, insert: false, update: false },                
			   }
		   ,
		   projects_handled:
			   {     
				slNo: { view: true, insert: true, update: true },       
				facultyId : { view: true, insert: true, update: true },
				batch : { view: false, insert: false, update: false },
				ugOrPg : { view: false, insert: false, update: false },
				projectTitle : { view: false, insert: false, update: false },               
			   }
		   ,
		   faculty_research:
			   {            
				slNo: { view: true, insert: true, update: true },
				guideName: { view: false, insert: false, update: false },
				researchCandidateName:{ view: false, insert: false, update: false },
				usn:{ view: false, insert: false, update: false },
				centreName:{ view: false, insert: false, update: false },
				university:{ view: false, insert: false, update: false },
				registrationYear:{ view: false, insert: false, update: false },
				title:{ view: false, insert: false, update: false },
				status:{ view: false, insert: false, update: false },
				facultyId:{ view: true, insert: true, update: true }       
			   }
		   ,
		   phd_scholar:
			{ 
				slNo: { view: true, insert: true, update: true },           
				facultyId:{ view: true, insert: true, update: true },
				scholarName:{ view: false, insert: false, update: false },
				guideName:{ view: false, insert: false, update: false },
				researchCentre:{ view: false, insert: false, update: false },
				university:{ view: false, insert: false, update: false },
				registrationYear:{ view: false, insert: false, update: false },
				usn:{ view: false, insert: false, update: false },
				title:{ view: false, insert: false, update: false },
				status:{ view: false, insert: false, update: false }               
			}
		},
		GetParam: req.query.fId,
		/* tableNames : ["courses_handled", "projects_handled", "faculty_research", "phd_scholar"],
		columnSchema:[
			{
				facultyId : facultyID,
				yearHandled : "yearHandled", 
				subjectName : "subjectName",
				ugOrPg :  "ugOrPg",
				labHandled :  "labHandled",
			},
			{
				facultyId : facultyId,
				batch : "batch",
				ugOrPg : "ugOrPg",
				projectTitle : 'projectTitle',
			},
			{
				slNo: "slNo",
				guideName: "guideName",
				researchCandidateName:"researchCandidateName",
				usn:'usn',
				centreName:'centreName',
				university:'university',
				registrationYear:'registrationYear',
				title:'title',
				status:'status',
				facultyId:facultyId
			},
			{
				facultyId:facultyId,
				scholarName:'scholarName',
				guideName:'guideName',
				researchCentre:'researchCentre',
				university:'university',
				registrationYear:'registrationYear',
				usn:'usn',
				title:'title',
				status:'status'
			}
		], */
		authType:req.session.facultyId,
		departmentId:req.session.departmentId,
		insertPermission:facultyPermissions.insertPermission,
		updatePermission:facultyPermissions.updatePermission
	});
		
	}
	sqlExecute.getFaultyAcademics(facultyId, callback);
});


module.exports=router;