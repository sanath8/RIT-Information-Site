var mysql = require('mysql');
var mappingUrl = require('../../back-end/mappingUrlTable');
var sqlObject = function() {
  this.connection = require('../../dbConnect').connectDB();
}

sqlObject.prototype.login = function(email, pass, callback){
	var sql= "select * \
			from faculty \
			where emailId=? and password=?";
	this.connection.query(sql, [email, pass], function(err, result){
		callback(err, result);
	})
}

sqlObject.prototype.getWholeTable = function(callback, url){
  var sql = "select * from " + mappingUrl.mappingUrlTable[url];
  var data;
  this.connection.query(sql,function(err,results,fields){
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

sqlObject.prototype.getAchievements = function(callback){
  var sql1 = "select * from workshop_fdp";
  var sql2 = "select * from conference";
  var sql3 = "select * from guest_lecture";
  var sql4 = "select * from book";
  var sql5 = "select * from book_chapter";
  var sql6 = "select * from conference_paper";
  var sql7 = "select * from journal_paper";
  var data1, data2, data3, data4, data5, data6;
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
    data4 = results;
  });
  this.connection.query(sql5,function(err,results,fields){
    data5 = results;
  });
  this.connection.query(sql6,function(err,results,fields){
    data6 = results;
  });
  this.connection.query(sql7,function(err,results,fields){
    callback(err, data1, data2, data3, data4, data5, data6, results);
  });
}

var object = new sqlObject();

module.exports = object;
