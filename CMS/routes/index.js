var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.connection;


var Receptionsignin=require('../model/Receptionsignin');
var Adminsignin=require('../model/Adminsignin');
var Doctorsignin=require('../model/Doctorsignin');
var Usersignin=require('../model/Usersignin');
var AddDoctor=require('../model/AddDoctor');
var AddReception=require('../model/AddReception');
var AddMedicine=require('../model/AddMedicine');
var CostDay=require('../model/CostDay');
var CostMonth=require('../model/CostMonth');
var CostYear=require('../model/CostYear');
var ActiveDoctor=require('../model/ActiveDoctor');
var PatientRegistration=require('../model/PatientRegistration');
var PatientHistory=require('../model/PatientHistory');
var Print=require('../model/Print');
var Token=require('../model/Token');
var AddPrescription=require('../model/AddPrescription');
var DischargePatient=require('../model/DischargePatient');
var Appointment=require('../model/Appointment');
var Expense=require('../model/Expense');
var ViewPrecription=require('../model/ViewPrecription');
var PrintData=require('../model/PrintData')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/searchDetail', function(req, res, next) {
  Token.find(function(err,rtn){
    if(err)throw err;
  res.render('searchDetail',{token:rtn});
});
});

router.get('/viewPatientPage', function(req, res, next) {
  res.render('viewPatient/viewPatient');
});
router.get('/reception', function(req, res, next) {
  res.render('Signin/signin_reception');
});
router.get('/doctor', function(req, res, next) {
  res.render('Signin/signin_doctor');
});
router.get('/admin', function(req, res, next) {
  res.render('Signin/signin_admin');
});
router.get('/user', function(req, res, next) {
  res.render('Signin/signin_user');
});
router.get('/check_admin', function(req, res, next) {
  res.render('Signin_check/adminCheck');
});
router.get('/check_doctor', function(req, res, next) {
  res.render('Signin_check/doctorCheck');
});
router.get('/check_reception', function(req, res, next) {
  res.render('Signin_check/receptionCheck');
});
router.get('/check_user', function(req, res, next) {
  res.render('Signin_check/userCheck');
});
router.get('/main_admin', function(req, res, next) {
  res.render('mainPage/mainAdmin');
});
router.get('/main_doctor', function(req, res, next) {
  res.render('mainPage/mainDoctor');
});
router.get('/main_recetion', function(req, res, next) {
  res.render('mainPage/mainReception');
});
router.get('/main_user', function(req, res, next) {
  res.render('mainPage/mainUser');
});
router.get('/back_admin', function(req, res, next) {
  res.render('index')
});
router.get('/changeAdminPassword', function(req, res, next) {
  Adminsignin.findOne(function(err,rtn){
    if(err)throw err;
  res.render('changePassword/changeAdminPassword',{adminsignin:rtn})
});
});
router.get('/changeDoctorPassword', function(req, res, next) {
  Doctorsignin.findOne(function(err,rtn){
    if(err)throw err;
  res.render('changePassword/changeDoctorPassword',{doctorsignin:rtn})
  });
});
router.get('/changeReceptionPassword', function(req, res, next) {
  Receptionsignin.findOne(function(err,rtn){
    if(err)throw err;
  res.render('changePassword/ChangeReceptionPassword',{receptionsignin:rtn})
});
})
router.get('/changeUserPassword', function(req, res, next) {
  Usersignin.findOne(function(err,rtn){
    if(err)throw err;
  res.render('changePassword/changeUserPassword',{usersignin:rtn})
});
});


//printData


router.get('/printData', function(req, res, next) {
  res.render('printData/printDataForm')
});

router.post('/addPrintData',function(req,res){

  var amount=new PrintData();
  amount.name=req.body.medicine;
  amount.amount=req.body.cost;

  amount.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultPrintData');
  })
})

router.get('/resultPrintData',function(req,res){
  AddPrescription.find({}).sort({'insered':-1}).exec(function(err, rtn) {
    if (err) throw err;
    Token.findOne({}).sort({'insered':-1}).exec(function(err, rtn4) {
      if (err) throw err;

  AddMedicine.find(function(err,rtn1){
    if(err)throw err;
    AddDoctor.find(function(err,rtn3){
      if(err)throw err;

    PrintData.find(function(err,rtn2){
      if(err)throw err;
    console.log(rtn);
    res.render('dischargePatient/dischargePatientForm',{medicine:rtn1,amount:rtn2,prescription:rtn,doctor:rtn3,token:rtn4});
  })
})
})
})
})
})
router.get('/updatedata/:id',function(req,res){
  PrintData.findById(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('printData/updatePrintDataTable',{amount:rtn})
  })
})
router.post('/update',function(req,res){
  var updateData={
    name:req.body.medicine,
    amount:req.body.cost
  }
  PrintData.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultPrintData');

  })
})
router.get('/delete/:id',function(req,res){

  PrintData.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/resultPrintData')
  })

})

//close printData
//Expense

router.get('/expense', function(req, res, next) {
  res.render('expense/expenseForm');
});


router.post('/addExpense',function(req,res){
  var expense=new Expense();
  expense.medicine=req.body.medicine;
  expense.cost=req.body.cost;

  expense.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataExpense');
  })
})
  router.get('/returnDataExpense',function(req,res){
    Expense.find(function(err,rtn){
      if(err)throw err;
      console.log(rtn);
      res.render('expense/expenseTable',{expense:rtn});
    })
  })

  router.get('/updateExpense/:id',function(req,res){
    Expense.findById(req.params.id,function(err,rtn){
      if(err) throw err;
      console.log(rtn);
      res.render('expense/updateExpense',{expense:rtn});
    })
  })

  router.get('/deleteExpense/:id',function(req,res){

    Expense.findByIdAndRemove(req.params.id,function(err,rtn){
      if(err)throw err;
      res.redirect('/returnDataExpense');
    })

  })

  router.post('/updateDataExpense',function(req,res){
    var updateData={
      medicine:req.body.medicine,
      cost:req.body.cost
}
   Expense.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
      if(err)throw err;
      console.log(rtn);
      res.redirect('/returnDataExpense');
    })
  })

//close Expense
//'viewPrecription/viewPrecriptionForm
//ViewPrecription

router.get('/viewPrecription', function(req, res) {
  AddPrescription.find({}).sort({'insered':-1}).exec(function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('viewPrecription/viewPrecriptionForm', {prescription: rtn});
  });
});

router.post('/addViewPrecription', function(req, res) {
  var prescription_view = new ViewPrecription();

  prescription_view.name = req.body.name;
  prescription_view.disease = req.body.disease;
  prescription_view.prescript = req.body.prescription;
  prescription_view.treat=req.body.treat;
  // discharge.fee = req.body.fee;
  // console.log(req.body.labfee);
  // console.log(req.body.docfee);

  prescription_view.save(function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.redirect('/returnDataViewPrecription');
  });
});

router.get('/returnDataViewPrecription', function(req, res) {
  ViewPrecription.find(function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('viewPrecription/viewPrecriptionTable', {prescription_view: rtn});
  });
});

router.get('/updateViewPrecriptionTable/:id', function(req, res) {
  ViewPrecription.findById(req.params.id, function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('viewPrecription/updateViewPrecription', {prescription_view: rtn});
  });
});

router.get('/deleteViewPrecription/:id', function(req, res) {
  ViewPrecription.findByIdAndRemove(req.params.id, function(err, rtn) {
    if (err) throw err;
    res.redirect('/returnDataViewPrecription');
  });
});

router.post('/updateDataViewPrectription', function(req, res) {
  var updateData = {
    pid: req.body.pid,
    name: req.body.name,
    disease: req.body.disease,
    prescript: req.body.prescript,
    treat:req.body.treat
  };
  ViewPrecription.findByIdAndUpdate(req.body.id, {$set: updateData}, function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.redirect('/returnDataViewPrecription');
  });
});

//close ViewPrecription

//Appointment

router.get('/appointment', function(req, res, next) {
  AddDoctor.find(function (err,rtn) {
    if(err) throw err;
  res.render('appointment/appointmentForm', { doctor:rtn});
});
});

router.post('/addAppointment',function (req, res){
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
    if(err) throw err;
    console.log(rtn);
    res.redirect('/');
  });
});

router.get('/returnDataAppointment',function (req,res) {
  Appointment.find(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('/',{appointment: rtn});
  });
});
router.post('/addReceptionAppointment',function (req, res){
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
    if(err) throw err;
    console.log(rtn);
    res.redirect('/resultReceptionDataAppointment');
  });
});

router.get('/resultReceptionDataAppointment',function (req,res) {
  Appointment.find(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('appointment/appointmentForm',{appointment: rtn});
  });
});
router.get('/resultDataAppointment',function (req,res) {
  Appointment.find(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('adminViewData/viewAppointmentAdmin',{appointment: rtn});
  });
});

router.get('/viewAppointment',function (req,res) {
  Appointment.find(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('viewPatient/viewAppointment',{appointment: rtn});
  });
});

router.get('/updateAppointment/:id',function(req,res){
  Appointment.findById(req.params.id, function (err,rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('appointment/updateAppointments',{appointment: rtn});
  });
});

router.get('/deleteAppointment/:id',function (req,res) {
  Appointment.findByIdAndRemove(req.params.id, function (err,rtn) {
    if(err) throw err;
    res.redirect('/resultDataAppointment');
  });
});

router.post('/updateDataAppointment',function (req,res) {
  var updateData = {
    name:req.body.name,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    primary_ph:req.body.primary_ph,
    secondary_ph:req.body.secondary_ph,
    email:req.body.email,
    date_of_birth:req.body.date_of_birth,
    day:req.body.day,
    time:req.body.time,
    doctor:req.body.doctor,
    treat:req.body.treat,
    day_treat:req.body.day_treat,
    day_type:req.body.day_type
  };
  Appointment.findByIdAndUpdate(req.body.id,{$set:updateData},function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/resultDataAppointment');
  });
});

router.get('/deleteReceptionAppointment/:id',function (req,res) {
  Appointment.findByIdAndRemove(req.params.id, function (err,rtn) {
    if(err) throw err;
    res.redirect('/resultReceptionDataAppointment');
  });
});

router.post('/updateReceptionDataAppointment',function (req,res) {
  var updateData = {
    name:req.body.name,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    primary_ph:req.body.primary_ph,
    secondary_ph:req.body.secondary_ph,
    email:req.body.email,
    date_of_birth:req.body.date_of_birth,
    day:req.body.day,
    time:req.body.time,
    doctor:req.body.doctor,
    treat:req.body.treat,
    day_treat:req.body.day_treat,
    day_type:req.body.day_type
  };
  Appointment.findByIdAndUpdate(req.body.id,{$set:updateData},function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/resultDataAppointment');
  });
});

//close Appointment

//DischargePatient

router.get('/dischargePatient', function(req, res, next) {
  AddPrescription.find({}).sort({'insered':-1}).exec(function(err, rtn) {
    if (err) throw err;
    Token.findOne({}).sort({'insered':-1}).exec(function(err, rtn3) {
      if (err) throw err;

      AddDoctor.find(function(err, rtn4) {
        if (err) throw err;

    AddMedicine.find(function(err, rtn1) {
      if (err) throw err;

      PrintData.find(function(err, rtn2) {
        if (err) throw err;

        CostDay.find(function(err, rtn5) {
          if (err) throw err;
          CostMonth.find(function(err, rtn6) {
            if (err) throw err;
            CostYear.find(function(err, rtn7) {
              if (err) throw err;

  res.render('dischargePatient/dischargePatientForm', {prescription:rtn,medicine:rtn1,amount:rtn2,token:rtn3,doctor:rtn4,day:rtn5,month:rtn6,year:rtn7});
});
});
});
});
});
});});
});
});


router.post('/addDischargePatient', function(req, res) {
  var discharge = new DischargePatient();
   discharge.pid = req.body.pid;
  discharge.name = req.body.name;
  discharge.doctor = req.body.doctor;
  discharge.prescript = req.body.prescript;
  discharge.payFee = req.body.payFee;
  // console.log(req.body.labfee);
  // console.log(req.body.docfee);
  discharge.save(function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.redirect('/returnDataDischargePatient');
  });
});

router.get('/returnDataDischargePatient', function(req, res) {
  DischargePatient.find(function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('dischargePatient/dischargePatientTable', {discharge: rtn});
  });
});

router.get('/updateDischargePatient/:id', function(req, res) {
  DischargePatient.findById(req.params.id, function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('dischargePatient/updateDischargePatient', {
      discharge: rtn
    });
  });
});

router.get('/deleteDischargePatient/:id', function(req, res) {
  DischargePatient.findByIdAndRemove(req.params.id, function(err, rtn) {
    if (err) throw err;
    res.redirect('/returnDataDischargePatient');
  });
});

router.post('/updateDataDischargePatient', function(req, res) {
  var updateData = {
    pid: req.body.pid,
    name: req.body.name,
    doctor: req.body.doctor,
    prescript: req.body.prescript
  };
  DischargePatient.findByIdAndUpdate(req.body.id, {
    $set: updateData
  }, function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.redirect('/returnDataDischargePatient');
  });
});


//close DischargePatient
//AddPrescription

router.get('/addPrescription', function(req, res, next) {
  res.render('addPrescription/addPrescriptionForm', { title: 'Express' });
});

router.post('/addDataPrescription', function(req, res) {
  var prescription = new AddPrescription();

  prescription.name = req.body.name;
  prescription.disease = req.body.disease;
  prescription.prescript = req.body.prescription;
  prescription.type = req.body.type;
  // prescription.lab = req.body.lab;
  // prescription.refer = req.body.refer;
  // discharge.fee = req.body.fee;
  // console.log(req.body.labfee);
  // console.log(req.body.docfee);
  prescription.save(function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.redirect('/returnDataAddPrescription');
  });
});

router.get('/returnDataAddPrescription', function(req, res) {
  AddPrescription.find(function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('addPrescription/addPrescriptionForm', {prescription: rtn});
  });
});

router.get('/updateAddPrescript/:id', function(req, res) {
  AddPrescription.findById(req.params.id, function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.render('addPrescription/updatePrescription', {prescription: rtn});
  });
});

router.get('/deleteAddPrescript/:id', function(req, res) {
  AddPrescription.findByIdAndRemove(req.params.id, function(err, rtn) {
    if (err) throw err;
    res.redirect('/returnDataAddPrescription');
  });
});

router.post('/updateDataPrescription', function(req, res) {
  var updateData = {

    name: req.body.name,
    disease: req.body.disease,
    prescript: req.body.prescript,
    type:req.body.type
    // lab:req.body.lab,
    // refer:req.body.refer

  };
  AddPrescription.findByIdAndUpdate(req.body.id, {$set: updateData}, function(err, rtn) {
    if (err) throw err;
    console.log(rtn);
    res.redirect('/returnDataAddPrescription');
  });
});


//close AddPrescription
//token


router.get('/token',function(req,res){
  AddDoctor.find(function(err,rtn){
    if(err)throw err;
  Token.find(function(err,rtn1){
    if(err)throw err;
    console.log(rtn);
    res.render('token/tokenForm',{doctor:rtn,token:rtn1});
  })
})
})
router.post('/addToken',function(req,res){
  var token=new Token();
  var doctor=new AddDoctor();
  token.patientName=req.body.patientName;
  token.doctorName=req.body.doctorName;
  token.desease=req.body.desease;
  token.date=req.body.date;
  token.countToken=req.body.countToken;




  var updateData={
    percentage:(parseInt(req.body.countToken)+1)*5/100,
    count:parseInt(req.body.countToken)+1
  }
  AddDoctor.findByIdAndUpdate(token.doctorName,{$set:updateData},function(err,rtn){
    console.log(doctor.count);
    if(err)throw err;


  token.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataToken');
  })
})
})


router.get('/returnDataToken',function(req,res){
  Token.find(function(err,rtn){
    if(err)throw err;
    AddDoctor.find(function(err,rtn1){
      if(err)throw err;
    console.log(rtn);
    res.render('token/tokenForm',{token:rtn,doctor:rtn1});
  })
})
})
router.get('/updatetoken/:id',function(req,res){
  Token.findById(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('token/tokenUpdateTable',{token:rtn});
  })
})
router.get('/deleteToken/:id',function(req,res){
  Token.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/searchDetail');
  })
})
router.post('/updateDataToken',function(req,res){
  var updateData={
    patientName:req.body.patientName,
    doctorName:req.body.doctorName,
    desease:req.body.desease,
    date:req.body.date,
    countToken:req.body.countToken

  }
  Token.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/searchDetail');
  })
})

//close token
//adding doctorform
router.get('/addDoctor', function(req, res, next) {
  res.render('addDoctor/doctorViewForm');
});

router.get('/doctorProfile', function(req, res, next) {
  res.render('adminViewData/viewAddDoctor');
});

router.get('/doctorProfile1', function(req, res, next) {
  res.render('adminViewData/viewAddDoctor1');
});

router.post('/addingDoctors',function(req,res){
  var doctor=new AddDoctor();
  doctor.name=req.body.name;
  doctor.address=req.body.address;
  doctor.phno=req.body.phno;
  doctor.treat=req.body.treat;
  doctor.treatDay=req.body.treatDay;
  doctor.startTime=req.body.startTime;
  doctor.endTime=req.body.endTime;
  doctor.count=req.body.count;
  doctor.percentage=req.body.percentage;


  doctor.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultDoctorProfile')
  });
});
  router.get('/returnValueDoctor',function(req,res){
    AddDoctor.find(function(err,rtn){
      if(err)throw err;
      console.log(rtn);
      res.render('addDoctor/doctorTable',{doctor:rtn});
    })
  })
  router.get('/resultDoctorProfile',function(req,res){
    AddDoctor.find(function(err,rtn){
      if(err)throw err;
      console.log(rtn);
      res.render('addDoctor/doctorViewForm',{doctor:rtn});
    })
  })


  router.get('/updateDoctorInsert/:id',function(req,res){
    AddDoctor.findById(req.params.id,function(err,rtn){
      if (err)throw err;
      res.render('updateShow/doctor',{doctor:rtn});
    })
  });


  router.post('/updateDoctorInfo',function(req,res){
    var updateData={
    name:req.body.name,
    address: req.body.address,
    phno:req.body.phno,
    treat: req.body.treat,
    treatDay:req.body.treatDay,
    startTime: req.body.startTime,
    endTime:req.body.endTime,
    count: req.body.count,
    percentage:req.body.percentage
    }
    AddDoctor.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
      if(err)throw err;
      console.log(rtn);
      res.redirect('/returnAdminAddDoctorView');
    })
  })



router.get('/deleteDoctorInfo/:id',function(req,res){

  AddDoctor.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/returnAdminAddDoctorView')
  })

})
//close adding doctor

//AddReception
router.get('/addReception', function(req, res, next) {
  res.render('addReception/receptionViewForm');
});

router.post('/addReceptionInfo',function(req,res){
  var reception=new AddReception();
  reception.patientid=req.body.patientid;
  reception.name=req.body.name;
  reception.address=req.body.address;
  reception.phno=req.body.phno;

  reception.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultReceptionview');
  })
})
router.get('/returnReceptionData',function(req,res){
  AddReception.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('addReception/receptionTable',{reception:rtn});
  })
})
router.get('/resultReceptionview',function(req,res){
  AddReception.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('addReception/receptionViewForm',{reception:rtn});
  })
})

router.get('/updateReceptionData/:id',function(req,res){
  AddReception.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('updateShow/reception',{reception:rtn});
  })
})

router.get('/deleteReceptionInfo/:id',function(req,res){

  AddReception.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/resultReceptionAdmin')
  })

})
router.post('/updateReceptionInfo',function(req,res){
  var updateData={
    patientid:req.body.patientid,
    name:req.body.name,
    address:req.body.address,
    phno:req.body.phno
  }
  AddReception.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultReceptionAdmin');
  })
})
//close AddReception

//AddMedicine
router.get('/addMedicine', function(req, res, next) {
  res.render('addMedicine/medicineViewForm',{medicine:rtn});
});
router.post('/addMedicineInfo',function(req,res){
  var medicine=new AddMedicine();
  medicine.name=req.body.name;
  medicine.treat=req.body.treat;
  medicine.price=req.body.price;
  medicine.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultAdminMedicine');
  })
})
router.get('/resultAdminMedicine',function(req,res){
  AddMedicine.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('adminViewData/viewMedicineAdmin',{medicine:rtn});
  })
})
router.get('/returnMedicineInfo',function(req,res){
  AddMedicine.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('addMedicine/medicineTable',{medicine:rtn});
  })
})
router.get('/updateMedicineInfo/:id',function(req,res){
  AddMedicine.findById(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('updateShow/medicine',{medicine:rtn});
  })
})
router.post('/updateMedicineData',function(req,res){
  var updateData={
    name:req.body.name,
    treat:req.body.treat,
    price:req.body.price
  }
  AddMedicine.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultAdminMedicine');
  })
})
router.get('/deleteMedicineInfo/:id',function(req,res){
  AddMedicine.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultAdminMedicine');
  })
})
//close AddMedicine

//CostDay


router.get('/costDay', function(req, res, next) {
  res.render('costDay/costForm');
});
router.post('/addCost',function(req,res){
  var day=new CostDay();
  day.perday=req.body.perday;
  day.income=req.body.income;

  day.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultAdminDayView');
  })
})
router.get('/resultAdminDayView',function(req,res){
  CostDay.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('costDay/costForm',{day:rtn});
  })
})
router.get('/returnCostDay',function(req,res){
  CostDay.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('costDay/costTable',{day:rtn});
  })
})
router.get('/updateDayCost/:id',function(req,res){
  CostDay.findById(req.params.id,function(err,rtn){
  if(err)throw err;
  console.log(rtn);
  res.render('costDay/updateCostTable',{day:rtn});
})
})
router.post('/updateDay',function(req,res){
  var updateData={
    perday:req.body.perday,
    income:req.body.income
  }
  CostDay.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultAdminDayView');
  })
})
router.get('/deleteDayCost/:id',function(req,res){
  CostDay.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultAdminDayView');
  })
})
router.get('/resultdeleteDayCost/:id',function(req,res){
  CostDay.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/generalTable');
  })
})

//close CostDay



//costMonth

router.get('/costMonth', function(req, res, next) {
 res.render('costMonth/costMonthForm');
});

router.post('/costMonthAdd',function(req,res){
 var month=new CostMonth();
 month.permonth=req.body.permonth;
 month.income=req.body.income;
 month.save(function(err,rtn){
 if(err)throw err;
 console.log(rtn);
 res.redirect('/res');
 })
})
router.get('/returnCostMonthData',function(req,res){
 CostMonth.find(function(err,rtn){
 if(err)throw err;
  console.log(rtn);
 res.render('costMonth/costMonthTable',{month:rtn});
 })
})

router.get('/res',function(req,res){
 CostMonth.find(function(err,rtn){
 if(err)throw err;
  console.log(rtn);
 res.render('costMonth/costMonthForm',{month:rtn});
 })
})
router.get('/updateDataCost/:id',function(req,res){
 CostMonth.findById(req.params.id,function(err,rtn){
 if(err)throw err;
 console.log(rtn);
 res.render('costMonth/updateCostMonthTable',{month:rtn});
})
})

router.post('/updateData',function(req,res){
 var updateData={
  permonth:req.body.permonth,
   income:req.body.income
}

CostMonth.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
   if(err)throw err;
   console.log(rtn);
  res.redirect('/res');
 })
})

router.get('/deleteMonthData/:id',function(req,res){
  CostMonth.findByIdAndRemove(req.params.id,function(err,rtn){
   if(err)throw err;
  console.log(rtn);
 res.redirect('/res');
 })
})

router.get('/resultdeleteMonthData/:id',function(req,res){
  CostMonth.findByIdAndRemove(req.params.id,function(err,rtn){
   if(err)throw err;
  console.log(rtn);
 res.redirect('/generalTable');
 })
})

//close costMonth

//costYear

router.get('/costYear', function(req, res, next) {
res.render('costYear/costYearForm');
});

router.post('/addCostYear',function(req,res){
var year=new CostYear();
year.peryear=req.body.peryear;
year.income=req.body.income;
year.save(function(err,rtn){
if(err)throw err;
 console.log(rtn);
 res.redirect('/resultDataCostYear');
})
})

router.get('/returnDataCostYear',function(req,res){
CostYear.find(function(err,rtn){
 if(err)throw err;
console.log(rtn);
 res.render('costYear/costYearTable',{year:rtn});
})
})

router.get('/resultDataCostYear',function(req,res){
CostYear.find(function(err,rtn){
 if(err)throw err;
console.log(rtn);
 res.render('costYear/costYearForm',{year:rtn});
})
})

router.get('/updateCostYear/:id',function(req,res){
CostYear.findById(req.params.id,function(err,rtn){
 if(err)throw err;
console.log(rtn);
 res.render('costYear/costYearUpdateTable',{year:rtn});
})
})

router.post('/updateYearCost',function(req,res){
var updateData={
 peryear:req.body.peryear,
  income:req.body.income
}

CostYear.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
  if(err)throw err;
 console.log(rtn);
res.redirect('/resultDataCostYear');
})
})

router.get('/deleteCostYear/:id',function(req,res){
 CostYear.findByIdAndRemove(req.params.id,function(err,rtn){
  if(err)throw err;
  console.log(rtn);
res.redirect('/resultDataCostYear');
})
})

router.get('/resultDeleteYear/:id',function(req,res){
 CostYear.findByIdAndRemove(req.params.id,function(err,rtn){
  if(err)throw err;
  console.log(rtn);
res.redirect('/generalTable');
})
})

//close costYear

//Print

router.get('/print', function(req, res, next) {
  res.render('print/printForm');
});
router.post('/addPrint',function(req,res){
  var print=new Print();
  print.pname=req.body.pname;
  print.doctorname=req.body.doctorname;
  print.date=req.body.date;
  print.suffer=req.body.suffer;
  print.treatmentcost=req.body.treatmentcost;
  print.medicinecost=req.body.medicinecost;
  print.total=req.body.total;

  print.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataPrint');
  })
})

router.get('/returnDataPrint',function(req,res){
  Print.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('print/printTable',{print:rtn});
  })
})

router.get('/deleteDataPrint/:id',function(req,res){
  Print.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataPrint');
  })
})
router.get('/updatePrint/:id',function(req,res){
  Print.findById(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('print/updatePrintTable',{print:rtn});
  })
})
router.post('/updateDataPrint',function(req,res){
  var updateData={
    pname:req.body.pname,
    doctorname:req.body.doctorname,
    date:req.body.date,
    suffer:req.body.suffer,
    treatmentcost:req.body.treatmentcost,
    medicinecost:req.body.medicinecost,
    total:req.body.total
  }
  Print.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataPrint');
  })
})

//close Print

//activeDoctor

router.get('/activeDoctor', function(req, res, next) {
  res.render('activeDoctor/activeDoctorForm');
});


router.post('/addActiveDoctor',function(req,res){
  console.log('call');
  var doctor1=new ActiveDoctor();
  doctor1.doctor=req.body.doctor;
  doctor1.active=req.body.active;

  doctor1.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataActiveDoctor');
  })
})
router.get('/returnDataActiveDoctor',function(req,res){
  ActiveDoctor.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('activeDoctor/activeDoctorTable',{doc:rtn});
  })
})
router.get('/updateActiveDoctor/:id',function(req,res){
  ActiveDoctor.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('activeDoctor/updateActiveDoctorTable',{doc:rtn});
  })
})
router.post('/updateDataActiveDoctor',function(req,res){
  var updateData={
    doctor:req.body.doctor,
    active:req.body.active,
  }
  ActiveDoctor.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataActiveDoctor');
  })
})
router.get('/deleteDataActiveDoctor/:id',function(req,res){
  ActiveDoctor.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/returnDataActiveDoctor')
  })

})

//close activeDoctor

//PatientHistory

router.get('/patientHistory', function(req, res, next) {
  res.render('patientHistory/patientHistoryForm');
});

router.post('/addPatientHistory',function(req,res){
  var patient1=new PatientHistory();
  patient1.name=req.body.name;
  patient1.disease=req.body.disease;
  patient1.medicine=req.body.medicine;
  patient1.date=req.body.date;
  patient1.doctor=req.body.doctor;

  patient1.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataPatientHistory');
  })
})
router.get('/returnDataPatientHistory',function(req,res){
  PatientHistory.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('patientHistory/patientHistoryTable',{patient:rtn});
  })
})
router.get('/updatePatientHistory/:id',function(req,res){
  PatientHistory.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('patientHistory/updatePatientHistoryTable',{patient:rtn});
  })
})
router.post('/updateDataHistory',function(req,res){
  var updateData={
    name:req.body.name,
    disease:req.body.disease,
    medicine:req.body.medicine,
    date:req.body.date,
    doctor:req.body.doctor
  }
  PatientHistory.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataPatientHistory');
  })
})
router.get('/deletePatientHistory/:id',function(req,res){
  PatientHistory.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/returnDataPatientHistory')
  })

})

//close PatientHistory

//PatientRegistration

router.get('/patientRegistration', function(req, res, next) {
  res.render('patientRegistration/patientRegistrationForm');
});



router.post('/addPatientRegistration',function(req,res){
  var patient1=new PatientRegistration();
  patient1.name=req.body.name;
  patient1.age=req.body.age;
  patient1.date1=req.body.date1;
  patient1.gender=req.body.gender;
  patient1.married=req.body.married;
  patient1.address=req.body.address;
  patient1.phone=req.body.phone;
  patient1.date2=req.body.date2;
  patient1.blood=req.body.blood;
  patient1.complain=req.body.complain;

  patient1.save(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/returnDataPatientRegistration');
  })
})
router.get('/returnDataPatientRegistration',function(req,res){
  PatientRegistration.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('patientRegistration/patientRegistrationForm',{patient:rtn});
  })
})
router.get('/return',function(req,res){
  PatientRegistration.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('viewPatient/viewPatient',{patient:rtn});
  })
})




router.get('/returnAdminPatientView',function(req,res){
  PatientRegistration.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('adminViewData/viewPatientAdmin',{patient:rtn});
  })
})

router.get('/resultAdminPatientView',function(req,res){
  PatientRegistration.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('adminViewData/viewPatientAdmin',{patient:rtn});
  })
})


router.get('/returnAdminAddDoctorView',function(req,res){
  AddDoctor.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('adminViewData/viewAddDoctor',{doctor:rtn});
  })
})

router.get('/resultReceptionAdmin',function(req,res){
  AddReception.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('adminViewData/viewReceptionAdmin',{reception:rtn});
  })
})


router.get('/returnAdminViewMedicine',function(req,res){
  AddMedicine.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('adminViewData/viewMedicineAdmin',{medicine:rtn});
  })
})
router.get('/returnAdminViewAppointment',function(req,res){
  PatientRegistration.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('adminViewData/viewAppointmentAdmin',{medicine:rtn});
  })
})
// router.get('/updatePatientRegistration/:id',function(req,res){
//   PatientRegistration.findById(req.params.id,function(err,rtn){
//     if(err) throw err;
//     console.log(rtn);
//     res.render('patientRegistration/updatePatientRegistrationTable',{patient:rtn});
//   })
// })
router.get('/updatePatientRegistration/:id',function(req,res){
  PatientRegistration.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('updateShow/patient',{patient:rtn});
  })
})

router.post('/updateDataRegistration',function(req,res){
  var updateData={
    name:req.body.name,
    age:req.body.age,
    date1:req.body.date1,
    gender:req.body.gender,
    married:req.body.married,
    address:req.body.address,
    phone:req.body.phone,
    date2:req.body.date2,
    blood:req.body.blood,
    complain:req.body.complain
  }
  PatientRegistration.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/resultAdminPatientView');
  })
})
router.get('/deleteDataPatientRegistration/:id',function(req,res){
  PatientRegistration.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/returnDataPatientRegistration')
  })

})
router.get('/deleteDoctorDataPatientRegistration/:id',function(req,res){
  PatientRegistration.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/return')
  })

})

router.get('/deleteAdminDataPatientRegistration/:id',function(req,res){
  PatientRegistration.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/returnAdminPatientView')
  })

})

router.post('/updateDoctorPatientRegistration',function(req,res){
  var updateData={
    name:req.body.name,
    age:req.body.age,
    date1:req.body.date1,
    gender:req.body.gender,
    married:req.body.married,
    address:req.body.address,
    phone:req.body.phone,
    date2:req.body.date2,
    blood:req.body.blood,
    complain:req.body.complain
  }
  PatientRegistration.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/return');
  })
})

//close PatientRegistration

//data_add_reception_signin
router.post('/reception_reception_add',function (req,res) {
var receptionsignin=new Receptionsignin();

receptionsignin.email=req.body.email;
receptionsignin.password=req.body.password;

            receptionsignin.save(function (err,rtn) {
              if (err)throw err
                console.log(rtn);
                res.redirect('/dataReception')
            })
})

router.get('/dataReception',function (req,res) {
  Receptionsignin.find({},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('Dataview/dataReception',{receptionsignin:rtn})
  })
})

router.get('/updateReceptionSignIn/:id',function(req,res){
  Receptionsignin.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('Signin/updateSignin_reception',{receptionsignin:rtn});
  })
})

router.get('/deleteReceptionSignIn/:id',function(req,res){

  Receptionsignin.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    res.redirect('/dataReception');
  })

})

router.post('/updateReceptionData',function(req,res){
  var updateData={
    email:req.body.email,
    password:req.body.password
}
 Receptionsignin.findByIdAndUpdate(req.body.id,{$set:updateData},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/dataReception');
  })
})

router.get('/returnDataAppointment',function (req,res) {
  Appointment.find(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('appointment/appointmentTable',{appointment: rtn});
  });
});

//close_data_add_reception_signin

//data_add_admin_signin
router.post('/reception_admin_add',function (req,res) {
var adminsignin=new Adminsignin();
adminsignin.email=req.body.email;
adminsignin.password=req.body.password;

            adminsignin.save(function (err,rtn) {
              if (err)throw err
                console.log(rtn);
                res.redirect('/dataAdmin')
            })
})


router.get('/dataAdmin',function (req,res) {
  Adminsignin.find({},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('Dataview/dataAdmin',{adminsignin:rtn})
  })
})
//close_data_add_admin_signin

//data_add_doctor_signin
router.post('/reception_doctor_add',function (req,res) {
var doctorsignin=new Doctorsignin();

doctorsignin.email=req.body.email;
doctorsignin.password=req.body.password;

            doctorsignin.save(function (err,rtn) {
              if (err)throw err
                console.log(rtn);
                res.redirect('/dataDoctor')
            })
})

router.get('/dataDoctor',function (req,res) {
  Doctorsignin.find({},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('Dataview/dataDoctor',{doctorsignin:rtn})
  })
})
//close_data_add_doctor_signin

//data_add_user_signin
router.post('/reception_user_add',function (req,res) {
var usersignin=new Usersignin();

usersignin.email=req.body.email;
usersignin.password=req.body.password;

            usersignin.save(function (err,rtn) {
              if (err)throw err
                console.log(rtn);
                res.redirect('/dataUser')
            })
})

router.get('/dataUser',function (req,res) {
  Usersignin.find({},function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('Dataview/dataUser',{usersignin:rtn})
  })
})
//close_data_add_user_signin


//check_login
router.post('/check_admin_login', function(req, res) {
Adminsignin.findOne({email:req.body.check_adminEmail},function(err,rtn){
console.log(rtn,req.body.check_adminPassword);
  if(err) throw err;
  if(rtn != null && req.body.check_adminPassword==rtn.password){
    res.redirect('/main_admin')
  }
  else {
  res.redirect('/');
  }
})
});

router.post('/check_doctor_login', function(req, res) {
Doctorsignin.findOne({email:req.body.check_doctorEmail},function(err,rtn){
console.log(rtn,req.body.check_doctorPassword);
  if(err) throw err;
  if(rtn != null && req.body.check_doctorPassword==rtn.password)
    res.redirect('/main_doctor')
  else
    res.redirect('/')
})
});

router.post('/check_reception_login', function(req, res) {
Receptionsignin.findOne({email:req.body.check_receptionEmail},function(err,rtn){
console.log(rtn,req.body.check_receptionPassword);
  if(err) throw err;
  if(rtn != null && req.body.check_receptionPassword==rtn.password){
    res.redirect('/main_recetion')
  }
  else {
  res.redirect('/');
  }
})
});

router.post('/check_user_login', function(req, res) {
Usersignin.findOne({email:req.body.check_userEmail},function(err,rtn){
console.log(rtn,req.body.check_userPassword);
  if(err) throw err;
  if(rtn != null && req.body.check_userPassword==rtn.password){
    res.redirect('/main_user')
  }
  else {
  res.redirect('/');
  }
})
});

router.get('/generalTable',function(req,res){
    CostDay.find({},function(err,rtn){
    if(err)throw err;

    CostMonth.find(function(err,rtn1){
      if(err)throw err;

    CostYear.find(function(err,rtn2){
        if(err)throw err;

    AddDoctor.find(function(err,rtn3){
        if(err)throw err;

    AddMedicine.find(function(err,rtn4){
        if(err)throw err;

    AddPrescription.find(function(err,rtn5){
        if(err)throw err;


        console.log(rtn);
    res.render('generalTable',{day:rtn,month:rtn1,year:rtn2,doctor:rtn3,medicine:rtn4,prescription:rtn5})
  })
})
})
})
})
})
})
//close_check_clogin

//password changePassword

router.post('/receptionPasswordChange',function(req,res){

  var updateData={
  password:req.body.txtPassword
  }
  Receptionsignin.findByIdAndUpdate(req.body.idReception,{$set:updateData},function(err,rtn){
    if(err)throw err;

    console.log(rtn);
    res.redirect('/changeReceptionPassword');
  })
})

router.post('/adminPasswordChange',function(req,res){

  var updateData={
  password:req.body.txtPassword
  }
  Adminsignin.findByIdAndUpdate(req.body.idReception,{$set:updateData},function(err,rtn){
    if(err)throw err;

    console.log(rtn);
    res.redirect('/changeAdminPassword');
  })
})

router.post('/doctorPasswordChange',function(req,res){

  var updateData={
  password:req.body.txtPassword
  }
  Doctorsignin.findByIdAndUpdate(req.body.idReception,{$set:updateData},function(err,rtn){
    if(err)throw err;

    console.log(rtn);
    res.redirect('/changeDoctorPassword');
  })
})

router.post('/changeUserPassword',function(req,res){

  var updateData={
  password:req.body.txtPassword
  }
  UserSignIn.findByIdAndUpdate(req.body.idReception,{$set:updateData},function(err,rtn){
    if(err)throw err;

    console.log(rtn);
    res.redirect('/changeUserPassword');
  })
})


//close password chage


//print

router.post('/print', function(req, res) {
  var day=new CostDay();

   day.perday=req.body.dataDate;
   day.income=req.body.dataTotal;

   day.save(function(err1,rtn1){
     if(err1)throw err1;

         db.dropCollection("printdatas", function (err4, result) {

       if (err4) {

           console.log("error delete collection");

       } else {

           console.log("delete collection success");

       }

   });


     res.redirect('/dischargePatient');
   })
});

//close print

//searchDetail

router.post('/search', function(req, res){
  var findname = req.body.inputText
  Token.find( { $or:[ {'patientName':findname}, {'doctorName':findname}, {'desease':findname}, {'date':findname} ]},
  function(err,docs){
    if(err)throw err;
    res.render('searchDetail',{token:docs})
});
});

router.post('/searchPatient', function(req, res){
  var aa = req.body.inputText
  PatientRegistration.find( { $or:[ {'name':aa}, {'age':aa}, {'date1':aa},
   {'gender':aa},{'married':aa}, {'address':aa}, {'phone':aa}, {'date2':aa}, {'blood':aa}, {'complain':aa} ]},
  function(err,docs){
    if(err)throw err;
    res.render('adminViewData/viewPatientAdmin',{patient:docs})
});
});

router.post('/searchDoctor', function(req, res){
  var aa = req.body.inputDoctor;
  AddDoctor.find( { $or:[ {'name':aa}, {'address':aa}, {'phno':aa},
   {'treat':aa},{'treatDay':aa}, {'startTime':aa}, {'endTime':aa}, {'count':aa}, {'percentage':aa} ]},
  function(err,docs){
    if(err)throw err;
    res.render('adminViewData/viewAddDoctor',{doctor:docs})
});
});



//close searchDetail
module.exports = router;
