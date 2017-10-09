'use strict';
var express = require('express');
var router = express.Router();

var user = require('../config/models/user.js');
var companymodel = require('../config/models/compdata.js');
var isloggedin = user.methods.isloggedin;

//CONNECT TO EXTERNAL API USING HTTPS GET REQUEST
/*
var prntfl;
var username = 'fr6poyaa-0o86-zcih';
var password = 'ofax-5e54isqv3684';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

var https = require("https");
var options = {
    host : "api.printful.com",
    path : "/files?limit=5",
    json : true,
    method : "GET",
    
    headers : {
        Authorization : auth,
        "content-type" : "application/json"
    }
    
};
var str = "";
var callback = function(response) {
      response.on('data', function (chunk) {
        str += chunk;
      });
      response.on('end', function () {
        //console.log(req.data);
        prntfl = JSON.parse(str);
        console.log(prntfl);
      });
    }

var request = https.get(options, callback);
request.end();
*/

router.post("/invest/:id", isloggedin, (req, res, next)=>{
    var objid = req.params.id;
    console.log(objid);
    var db = req.db;
    var objectid = req.ObjectId;
    var collction = db.collection("comp");
    /*var cursor = collction.find({_id : objectid(objid)});
    cursor.toArray((e, objs)=>{
        if(e){
            console.log(e);
        }
        console.log(objs);
        res.send({msg:objs})
    });
    */
    //companymodel.profile.fundraiser.investors = req.body;
var invstrdata = req.body;
    invstrdata.email = req.session.user.local.email
    
    console.log(invstrdata);
    db.collection("comp",(err, comp)=>{
        if(err){
            console.log(err);
        }
        comp.update({_id: objectid(objid)}, {$push : {"profile.investors": invstrdata}}, (er, thisobj)=>{
            if(er){
                console.log("An error occured:" + er)
            }else{
                var cllctn = db.collection("user");
                var cursr =  cllctn.fint({"local.email" : req.session.user.local.email});
                
            }
            //console.log(thisobj);
            res.send({msg:thisobj});
        });
        
    });
    
});

router.post( "/compcreate/",isloggedin, (req, res, next)=>{
    var db = req.db;
    var collexist = 0;
    
    db.listCollections().toArray((er,coll)=>{
        
        for(var i=0;i<coll.length;i++){
            if(coll[i].name == 'comp'){
                collexist++;
            }
            console.log((i+1)+') collection name: '+coll[i].name);
        }
        console.log('collectionextist: '+collexist);
        if(collexist==1){
            
            //collction = db.collection('comp');
            console.log('database collection "comp" already exists');
        }else if(collexist==0){
            db.createCollection('comp',(er,r)=>{
                if(er){
                    console.log('failed to create database because of error: '+er);
                }else{
                    console.log('database collection created : '+r);
                }
            });
        }
    });    
    var  collction = db.collection('comp');

    var eml = req.session.user.local.email;
    var crsor = collction.find();
    var occrence;
    companymodel.email=eml;
    companymodel.profile.fundraiser.compname = req.body.compname;
    companymodel.profile.fundraiser.industry = req.body.industry;
    companymodel.profile.fundraiser.amount = req.body.amount;
    companymodel.profile.fundraiser.description = req.body.description;
    //console.log(companymodel);
    
    crsor.toArray((e,usr)=>{
        console.log(e);
        if(e){
            console.log(e);
            res.send({msg:'Error : '+e})
        }else{
            
            for(var p =0; p < usr.length; p++){
                
                console.log('user exist is :'+usr[p]);
                if(usr[p].email == eml){
                    occrence = p;
                }else{
                    console.log(eml);
                }
                console.log(eml);
                //console.log(usr[p]);
                //console.log(req.originalUrl);                
            }
            
            //if(occrence == null){
                collction.insert(companymodel,(er,re)=>{
                    if(er){
                        res.send({msg:'error ocurred: '+er});
                    }else{
                        var __id = companymodel._id;
                        if(companymodel._id){
                            delete companymodel._id;
                        }
                        
                        console.log('company inserted, results are :'+re);
                        res.send({msg:'newcompadded',comp:companymodel, id: __id,sessemail:req.session.user.local.email});
                    }
                });
            //}
            //console.log(req.body);
            //res.send({msg:usr[0]})
        }
    });
    //console.log(eml);
    
    
});

router.get('/getothercomps/', isloggedin, (req, res, next)=>{
    var db = req.db;
    var colltn = db.collection('comp');
    var cursr =  colltn.find();
    var tempjsn = {};
    var bb=0, findss = [];
    //console.log("\n user session: " + req.session.user._id +" --");
    cursr.toArray((er, findings)=>{
        for(var f = (findings.length-1);f>-1; f--){
            //console.log(findings[f]);
            findss[bb] = findings[f];
            bb++
        }
        if(er){
            console.log(er);
            res.send({error:'Error occured : '+er});
        }else{
            console.log(req.session.user);
            res.send({content:findss, sessemail:req.session.user.local.email});
        }
    });
    
});

module.exports = router;