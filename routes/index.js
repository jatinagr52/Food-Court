var express = require('express');
var firebase=require('firebase');
var router = express.Router();
var fb= require('firebase-nodejs');
var web3 =require('web3');
var myweb=new web3(new web3.providers.HttpProvider('http://localhost:8545'));
var abi=[ { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowed", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_initialAmount", "type": "uint256" }, { "name": "_tokenName", "type": "string" }, { "name": "_decimalUnits", "type": "uint8" }, { "name": "_tokenSymbol", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];

var addr="0x21d874d519f4277a7d46fd91616cc4f6238f8d93";


// var my=web3.eth.contract(abi);
// var p=my.at(addr);
//var myContract= new  myweb.eth.Contract(abi,addr);
//var token= new myweb.eth.Contract(abi).at(addr);
  var myContract=new myweb.eth.Contract(abi,addr);
  //console.log(my.options);
  //var myContract =new myweb.eth.Contract(abi).at(addr);
//console.log(myweb.eth.Contract);
  //var newCon=   myContract.at(addr);
//var myContract=new myweb.eth.Contract(abi,addr,{from:myweb.eth.coinbase});
//console.log(token);
//console.log(myContract);
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

/* -------------------------------------------------------------run when connect-------------------*/
// var newAcc;
// refC.on('child_added',function(result){
//     var newAcc=result.val().password;
//     console.log(newAcc);
//     var newAccAddr=myweb.eth.personal.newAccount(newAcc);
//      refC.push({
//        address:newAccAddr,
//      });
// });
router.post('/collector',function(req,res,next){
refC.on('value',function(snapshot){
  if(req.body.cid==snapshot.val().ID){
    res.redirect('/transfer');
  }
  else{
    res.redirect('/collector');
    console.log("invalid userid");
  }
})

});
router.post('/register',function(req,res,next){

 addRef.push({
   sname: req.body.sname,
   id: req.body.sid,
   name: req.body.name,
   password:req.body.password,
   email: req.body.email,
   phone: req.body.phn
 });

 res.redirect('/login');
});

 var myAddr,myName;
router.post('/transfer',function(req,res,next){

  myContract.methods.balanceOf(myweb.eth.coinbase).call({from:"0x8c28785217433c45e0de9d18add7084146d3e48f"},function(err,res){

    console.log(res);
  });
  refC.on('value',function(snapshot){
 myAddr=snapshot.val().address;

  });
console.log(myAddr);
//myweb.eth.personal.unlockAccount("0x8c28785217433c45e0de9d18add7084146d3e48f","jatin");
myContract.methods.transferFrom("0x8c28785217433c45e0de9d18add7084146d3e48f",myAddr,req.body.token).send({from:"0x8c28785217433c45e0de9d18add7084146d3e48f"},function(err,txhash){
  if(err){
    console.log(err);
    res.redirect('/transfer');
  }
else{
  refC.on('value',function(snapshot){

  myName=snapshot.val().ID;
  });
  console.log(myName);
 var transaction={
    from: "admin",
    to: myName,
    value : req.body.token,
    time : new Date(),
    tx_info:txhash
  };

   res.render('success',{trans: transaction});
}
});
myContract.methods.balanceOf(myAddr).call({from:"0x8c28785217433c45e0de9d18add7084146d3e48f"},function(err,result){
  console.log(result);
})




});


module.exports = router;
