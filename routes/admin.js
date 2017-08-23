'use strict';
var express = require('express');
var router = express.Router();

var user = require('../config/models/user.js');
var companymodel = require('../config/models/compdata.js');
var isloggedin = user.methods.isloggedin;

router.post('/compcreate/',isloggedin, (req, res, next)=>{
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
    console.log(companymodel);
    
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
                        res.send({msg:'newcompadded',comp:companymodel, id: __id});
                    }
                });
            //}
            //console.log(req.body);
            //res.send({msg:usr[0]})
        }
    });
    //console.log(eml);
    
    
});

router.get('/getothercomps/', /*isloggedin,*/ (req, res, next)=>{
    var db = req.db;
    var colltn = db.collection('comp');
    var cursr =  colltn.find();
    var tempjsn = {};
    var bb=0, findss = [];
    cursr.toArray((er, findings)=>{
        for(var f = (findings.length-1);f>-1; f--){
            console.log(findings[f]);
            findss[bb] = findings[f];
            bb++
        }
        if(er){
            console.log(er);
            res.send({error:'Error occured : '+er});
        }else{
            res.send({content:findss});
        }
    });
    
});

module.exports = router;