var express = require('express');
var firebase=require('firebase');
var router = express.Router();
//var model=require('../model/collector');
/* GET home page. */
firebase.initializeApp({
  apiKey: "AIzaSyD8bVeIajJkBAGa1fliiESlKj5FsIVKqbE",
    authDomain: "food-court-9abb2.firebaseapp.com",
    databaseURL: "https://food-court-9abb2.firebaseio.com",
    projectId: "food-court-9abb2",
    storageBucket: "food-court-9abb2.appspot.com",
    messagingSenderId: "1047058137826"
});
var database = firebase.database();
var ref=database.ref('shop');
var addRef= ref.child('register');
var refC=database.ref('Customer');
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login',function(req,res,next){
  res.render('login');
  console.log("login is running");
});
router.get('/register',function(req,res,next){
  res.render('register');
  console.log("register is running");
});

router.get('/collector',function(req,res,next){
  res.render('collector');
});
router.get('/transfer',function(req,res,next){
  res.render('transfer');
});
router.get('/success',function(req,res,next){
  console.log("RENDERING>>>");
  res.render('success');
});
router.get('/success1',function(req,res,next){

  res.render('successs1');
});
router.post('/login',function(req,res,next){
  if(req.body.email=="admin@gmail.com" && req.body.password=="admin@123"){
    res.redirect('/collector');
  }
});

router.post('/collector',function(req,res,next){

    refC.on("value",function(obj){
      console.log(obj.value());
    });

  //console.log(req.body.cid);
  // if(req.body.cid=="jatin"){
  //   res.redirect('/transfer');
  // }
  // else{
  //   res.redirect('/collector');
  // }
});
router.post('/register',function(req,res,next){
 console.log("ja rha h iss loop m");
 addRef.push({
   sname: req.body.sname,
   id: req.body.sid,
   name: req.body.name,
   password:req.body.password,
   email: req.body.email,
   phone: req.body.phn
 });
 console.log('this is running...');
 res.redirect('/login');
});
router.post('/transfer',function(req,res,next){
  res.redirect('home/hadoop/final/food/views/success');
})


module.exports = router;
