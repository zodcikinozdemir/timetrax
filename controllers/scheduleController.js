var express = require('express');
var models  = require('../models');
var router  = express.Router();
var path = require('path');
var moment =require('moment')

router.get('/user/:userName', function(req,res) {
    models.Schedule.findAll(

      { include: [
        { 
          model : models.User,
          where: { username: req.params.userName} 
        },
        {
          model:  models.Job 
        }
      ]
    }).then(function(data){
    var jobList = [];

    for(var i=0; i< data.length; i++){
   //moving the needed data to an array
    var job = {};
    job.id = data[i].id;
    job.startDate = moment(data[i].startDate).format('L');
    job.startTime = data[i].startTime;
    job.endTime = data[i].endTime;
    job.jobName = data[i].Job.name;
    job.jobAdd = data[i].Job.address;
    job.jobCity = data[i].Job.city;
    job.jobState = data[i].Job.state;
    job.jobZip = data[i].Job.zip;
    

    jobList.push(job)
  }
     res.json(jobList)
  })

});

router.get('/schedule/:scheduleId', function(req,res) {
  vSchId = req.params.scheduleId;

  models.Schedule.findOne({
    include: [
        { 
          model : models.User
        },
        {
          model:  models.Job 
        }
      ],
    where: {
      'id' : vSchId
    }
  }).then(function(data){
   
    var vSchedule = {};
    vSchedule.id = data.id;
    vSchedule.startDate =data.startDate;
    vSchedule.startTime = data.startTime;
    vSchedule.endTime = data.endTime;
    vSchedule.JobId = data.JobId;
    vSchedule.UserId = data.UserId;
    vSchedule.jobname =data.Job.name;
    vSchedule.jobcity =data.Job.city;
    vSchedule.firstname = data.User.firstname;
    
    res.json(vSchedule);
  })
});


router.get('/user/today/:userName', function(req,res) {
    var today = Date.now();
    //today = moment(today).format("YYYY-MM-DD");
    models.Schedule.findAll(
      { include: [
        { 
          model : models.User,
          where: { username: req.params.userName} 
        },
        {
          model:  models.Job 
        }
      ] ,
      where: 
      { startDate:
        {
          $gt: new Date(today)
         // $lt: new Date(new Date() + 24 * 60 * 60 * 1000)
        }
      }

    }).then(function(data){
    var jobList = [];

    for(var i=0; i< data.length; i++){
   //moving the needed data to an array
    var job = {};
    job.id = data[i].id;
    job.startDate = moment(data[i].startDate).format('L');
    job.startTime = data[i].startTime;
    job.endTime = data[i].endTime;
    job.jobName = data[i].Job.name;
    job.jobAdd = data[i].Job.address;
    job.jobCity = data[i].Job.city;
    job.jobState = data[i].Job.state;
    job.jobZip = data[i].Job.zip;
    

    jobList.push(job)
  }
     res.json(jobList)
  })

});

module.exports = router;