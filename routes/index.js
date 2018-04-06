var express = require('express');
var firebase=require('firebase');
var router = express.Router();
var fb= require('firebase-nodejs');
var web3 =require('web3');
var myweb=new web3(new web3.providers.HttpProvider('http://localhost:8545'));
var abi=[ { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowed", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_initialAmount", "type": "uint256" }, { "name": "_tokenName", "type": "string" }, { "name": "_decimalUnits", "type": "uint8" }, { "name": "_tokenSymbol", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];

var addr="0x8931024ed383b00154a9f7ce13aa889b96c5806f";
var coinbase="0x7747747e72f7fe63c79157de2132f98ad2083107";
 var myAddr,myName;


  var myContract= new myweb.eth.Contract(abi,addr);
 //console.log(myContract);

firebase.initializeApp({
  apiKey: "AIzaSyAC6XBMhlV2XFecuXBa03UefrFRx8x_Ynk",
    authDomain: "foodcourtsai.firebaseapp.com",
    databaseURL: "https://foodcourtsai.firebaseio.com",
    projectId: "foodcourtsai",
    storageBucket: "foodcourtsai.appspot.com",
    messagingSenderId: "122258299921"
});
// var config = {
//     apiKey: "AIzaSyD8bVeIajJkBAGa1fliiESlKj5FsIVKqbE",
//     authDomain: "food-court-9abb2.firebaseapp.com",
//     databaseURL: "https://food-court-9abb2.firebaseio.com",
//     projectId: "food-court-9abb2",
//     storageBucket: "food-court-9abb2.appspot.com",
//     messagingSenderId: "1047058137826"
//   };
//   firebase.initializeApp(config);

var database = firebase.database();
var addRef=database.ref('shop');
var refC=database.ref('User');
var newRef=refC.child('id');
var refT=database.ref('Token');

//get request for web pages
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
  res.render('success');
});
router.get('/success1',function(req,res,next){
  res.render('success1');
});


//saving address to newly added customer in database
refC.on('child_added',function(result){
     console.log(result.val());
    myweb.eth.personal.newAccount(result.val().password).then(function(resp,err){
        console.log("account created successfully"+ resp);
        refC.child(result.key).update({
         address:resp,
        });
    });
});


// admin login
router.post('/login',function(req,res,next){
   if(req.body.email=="admin@gmail.com" && req.body.password=="admin@123"){
     console.log("admin loged in");
     res.redirect('/collector');
   }
});

//check whether user exists or not for foody transfer
router.post('/collector',function(req,res,next){
   refC.on('value',function(snapshot){
      details= snapshot.val();
      var keys=Object.keys(details);
      var flag=0;
      for(i=0 ;i<keys.length;i++){
         var k=keys[i];
         if(req.body.cid==k){
            myContract.methods.balanceOf(coinbase).call({from:coinbase},function(err,result){
               console.log("admin account balance "+result);
               var total={
                     bal:result,
                     id:k,
               };
              res.render('transfer',{tot:total});
           });
          flag=1;
          break;
       }
     }
    if(flag==0){
      res.redirect('/customer');
      console.log('invalid user');
    }
  });
});

//register for new shops in food court
router.post('/register',function(req,res,next){
    myweb.eth.personal.newAccount(req.body.password).then(function(res,err){
       addRef.push({
          sname: req.body.sname,
          id: req.body.sid,
          name: req.body.name,
          password:req.body.password,
          email: req.body.email,
          phone: req.body.phn,
          address: res,
      });
   });
  res.redirect('/success1');
});

//transfer foody to particuler customer account
router.post('/transfer',function(req,res,next){
   refC.on('value',function(snap){
        var newDetails=snap.val();
        var key=Object.keys(newDetails);
        console.log("Foody transfers to "+newDetails[req.body.myid].address);
        myweb.eth.personal.unlockAccount(coinbase,"admin");
        myContract.methods.transfer(newDetails[req.body.myid].address,req.body.token).send({from:coinbase},function(err,txhash){
            if(err){
               console.log(err);
               res.redirect('/transfer');
              }
           else
            {
              setTimeout(function(){
                 var transaction={
                     from: "admin",
                     to: req.body.myid,
                     value : req.body.token,
                     time : new Date(),
                     tx_info:txhash
                 };
                res.render('success',{trans: transaction});
                myContract.methods.balanceOf(newDetails[req.body.myid].address).call({from:coinbase},function(err,result){
                   if(err){
                     console.log(err);
                   }
                   else{
                     refT.push({
                       id: req.body.myid,
                       token: result
                     });
                     console.log(result +"F balance of account");
                  }
               });
            },80000);
          }
     });
  });
});


module.exports = router;
