var mysql = require('mysql');
var mappingUrl = require('../../back-end/mappingUrlTable');


var sqlObject = function() {
	this.connection = require('../../dbConnect').connectDB();
	this.tables = mappingUrl.mappingUrlTable;
}

sqlObject.prototype.login = function(email, pass, callback){
	var sql= "select * \
			from faculty \
			where emailId=? and password=?";
	this.connection.query(sql, [email, pass], function(err, result){
		callback(err, result);
	})
}

sqlObject.prototype.getFacultyInfo=function(fid, callback){
	var sql="Select * \
			from "+this.tables.facultyInformation+" \
			where facultyId=?";
	this.connection.query(sql, [fid], function(err, result){
		callback(err, result);
	})
}
sqlObject.prototype.getFaultyQualification = function(fid, callback){
	var sql = "select Q.* \
		from " + this.tables.facultyQualification+" Q natural join "+this.tables.facultyInformation+"\
		WHERE facultyId=?";
	this.connection.query(sql, [fid],function(err,results,fields){
		console.log(results);
		callback(err, results);
	});
}
sqlObject.prototype.getFaultyService = function(fid, callback){
	var sql = "select designation, qualification, joiningDate, yearsOfExperience, promotionDate, payScale \
		from " + this.tables.facultyServiceDetails+" S \
		WHERE facultyId=?";
	this.connection.query(sql, [fid],function(err,results,fields){
		console.log(results);
		callback(err, results);
	});
}

sqlObject.prototype.getFaultyAcademics = function(fid, callback){
  	var sql = "select yearHandled, subjectName, ugOrPg, labHandled \
      from " + this.tables.facultyCourseHandled+" \
      WHERE facultyId=?";
	
	var data={}
	var connection = this.connection;
	var myO=this;

	this.connection.query(sql, [fid],function(err,results,fields){
		console.log(results);
		if(err){
			callback(err, undefined);
			return;
		}
		data["courses_handled"]=results;

		sql="select  batch, ugOrPg, projectTitle\
			from "+myO.tables.facultyProjectGuided+"\
			Where facultyId=?";

		connection.query(sql, [fid], function(err, results){
			console.log(results);
			if(err){
				callback(err, undefined);
				return;
			}
			data["projects_handled"]=results;

			sql="select  guideName, researchCandidateName, usn, centreName, university,registrationYear,title,status\
				from "+myO.tables.facultyResearch+"\
				Where facultyId=?";
			connection.query(sql, [fid], function(err, results){
				console.log(results);
				if(err){
					callback(err, undefined);
					return;
				}
				data["faculty_research"]=results;

				sql="select scholarName, guideName, researchCentre, university, registrationYear, usn, title, status \
					from "+myO.tables.PhdScholar+"\
					Where facultyId=?";
				connection.query(sql, [fid], function(err, results){
					console.log(results);
					if(err){
						callback(err, undefined);
						return;
					}
					data["phd_scholar"]=results;
					callback(undefined, data);
				})
			})	
		})
	});
}

sqlObject.prototype.getFaultyRND = function(fid, callback){
  	var sql = "select investigatorName, projectTitle, nameOfFundingAgent, sanctionOrderNumber, projectDuration, dateSanctioned, sanctionedAmount \
      from " + this.tables.facultyFundedProjects+" \
      WHERE facultyId=?";
	
	var data={}
	var connection = this.connection;
	var myO=this;

	this.connection.query(sql, [fid],function(err,results,fields){
		console.log(results);
		if(err){
			callback(err, undefined);
			return;
		}
		data["funded_projects"]=results;

		sql="select patentTitle, applicationNumber, dateOfFilingApplication, publicationDate \
			from "+myO.tables.facultyPatents+"\
			Where facultyId=?";

		connection.query(sql, [fid], function(err, results){
			console.log(results);
			if(err){
				callback(err, undefined);
				return;
			}
			data["faculty_patent"]=results;

			sql="select financialYear, clientOrganization, consultancyProjectTitle, amountReceived \
				from "+myO.tables.consultancyDetails+"\
				Where facultyId=?";
			connection.query(sql, [fid], function(err, results){
				console.log(results);
				if(err){
					callback(err, undefined);
					return;
				}
				data["consultancy"]=results;

				sql="select mouTitle, mouSignedWithIndustryOrGovt, mouSigningDate  \
					from "+myO.tables.industrialCollaborations+"\
					Where facultyId=?";
				connection.query(sql, [fid], function(err, results){
					console.log(results);
					if(err){
						callback(err, undefined);
						return;
					}
					data["industrial_collaboration_mou"]=results;
					callback(undefined, data);
				})
			})	
		})
	});
}

sqlObject.prototype.getFaultyAchievements = function(fid, callback){
  	var sql = "select investigatorName, projectTitle, nameOfFundingAgent, sanctionOrderNumber, projectDuration, dateSanctioned, sanctionedAmount \
      from " + this.tables.facultyFundedProjects+" \
      WHERE facultyId=?";
	
	var data={}
	var connection = this.connection;
	var myO=this;

	this.connection.query(sql, [fid],function(err,results,fields){
		console.log(results);
		if(err){
			callback(err, undefined);
			return;
		}
		data["funded_projects"]=results;

		sql="select patentTitle, applicationNumber, dateOfFilingApplication, publicationDate \
			from "+myO.tables.facultyPatents+"\
			Where facultyId=?";

		connection.query(sql, [fid], function(err, results){
			console.log(results);
			if(err){
				callback(err, undefined);
				return;
			}
			data["faculty_patent"]=results;

			sql="select financialYear, clientOrganization, consultancyProjectTitle, amountReceived \
				from "+myO.tables.consultancyDetails+"\
				Where facultyId=?";
			connection.query(sql, [fid], function(err, results){
				console.log(results);
				if(err){
					callback(err, undefined);
					return;
				}
				data["consultancy"]=results;

				sql="select mouTitle, mouSignedWithIndustryOrGovt, mouSigningDate  \
					from "+myO.tables.industrialCollaborations+"\
					Where facultyId=?";
				connection.query(sql, [fid], function(err, results){
					console.log(results);
					if(err){
						callback(err, undefined);
						return;
					}
					data["industrial_collaboration_mou"]=results;
					callback(undefined, data);
				})
			})	
		})
	});
}



sqlObject.prototype.getWholeTable = function(callback, url, email){
  var sql = "select * \
      from " + mappingUrl.mappingUrlTable[url]+" natural join "+this.tables.facultyInformation+"\
      WHERE emailId=?";
  var data;
  this.connection.query(sql, [email],function(err,results,fields){
    console.log(results);
    callback(err, results);
  });
}


  // this.connection.query(sql,function(err,results){
  //   console.log(results);
  //   this.connection = require('../../dbConnect').connectDB();
  //   this.connection.query(sql1,function(err,results1){
  //     console.log(results1);
  //     callback(err,results,results1);
  //   })
  // })

sqlObject.prototype.getTwoTables = function(callback, url1, url2){
  var sql1 = "select * from " + mappingUrl.mappingUrlTable[url1];
  var sql2 = "select * from " + mappingUrl.mappingUrlTable[url2];
  var data1;
  this.connection.query(sql1,function(err,results,fields){
    data1 = results;
  });
  this.connection.query(sql2,function(err,results,fields){
    callback(err, data1, results);
  });
}

sqlObject.prototype.getThreeTables = function(callback, url1, url2, url3){
  var sql1 = "select * from " + mappingUrl.mappingUrlTable[url1];
  var sql2 = "select * from " + mappingUrl.mappingUrlTable[url2];
  var sql3 = "select * from " + mappingUrl.mappingUrlTable[url3];
  var data1, data2;
  this.connection.query(sql1,function(err,results,fields){
    data1 = results;
  });
  this.connection.query(sql2,function(err,results,fields){
    data2 = results;
  });
  this.connection.query(sql3,function(err,results,fields){
    callback(err, data1, data2, results);
  });
}

sqlObject.prototype.getFourTables = function(callback, url1, url2, url3, url4){
  var sql1 = "select * from " + mappingUrl.mappingUrlTable[url1];
  var sql2 = "select * from " + mappingUrl.mappingUrlTable[url2];
  var sql3 = "select * from " + mappingUrl.mappingUrlTable[url3];
  var sql4 = "select * from " + mappingUrl.mappingUrlTable[url4];
  var data1, data2, data3;
  this.connection.query(sql1,function(err,results,fields){
    data1 = results;
  });
  this.connection.query(sql2,function(err,results,fields){
    data2 = results;
  });
  this.connection.query(sql3,function(err,results,fields){
    data3 = results;
  });
  this.connection.query(sql4,function(err,results,fields){
    callback(err, data1, data2, data3, results);
  });
}


var object = new sqlObject();

module.exports = object;
