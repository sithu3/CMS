var express = require('express');
var router = express.Router();
var Doctor = require('../model/AddDoctor');
var Appointment = require('../model/Appointment');

router.get('/doctors',function (req,res) {
  Doctor.find(function (err,rtn) {
    if(err){
      res.status(500).json({
        error: err
      })
    }
    if(rtn.length < 1){
      res.status(204).json({
        doctors:"Doctors Data Not Found"
      })
    }else {
      res.status(200).json({doctors:rtn})
    }
  })
});

router.get('/doctor/:id',function (req,res) {
  Doctor.findById(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        error:err
      })
    }
    if(rtn == null){
      res.status(204).json({
        error: "Doctor data not found"
      })
    }else {
      res.status(200).json({
        doctor: rtn
      })
    }
  })
})

router.post('/Addappointment',function (req,res) {
  var appointment = new Appointment();
  appointment.name=req.body.name;
  appointment.address=req.body.address;
  appointment.city=req.body.city;
  appointment.state=req.body.state;
  appointment.primary_ph=req.body.primary_ph;
  appointment.secondary_ph=req.body.secondary_ph;
  appointment.email=req.body.email;
  appointment.date_of_birth=req.body.date_of_birth;
  appointment.day=req.body.day;
  appointment.time=req.body.time;
  appointment.doctor=req.body.doctor;
  appointment.treat=req.body.treat;
  appointment.day_treat=req.body.day_treat;
  appointment.day_type=req.body.day_type;

  appointment.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        error: err
      })
    }
    res.status(200).json({
      data: "Appointment add success"
    })
  })
})

module.exports = router;
