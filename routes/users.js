//REMEMBEER TO NULL msg in the res json Object
'use strict';
var express = require('express');
var router = express.Router();
var mypages = require('../config/models/pages.js');
var user = require('../config/models/user.js');
var isloggedin = user.methods.isloggedin;
//var session = require('express-session');
/* GET users listing. */

router.get('/userinfo/', isloggedin ,(req, res, next)=>{
    if(req.loggedstat === false){
        res.send({msg:'doorclosed'})
    }
    
    var db = req.db;
    var collctn = db.collection('user');
    //console.log(req.originalUrl)
    
    var dbinstance =0;
    var index={};
    var cursor = collctn.find();
    cursor.toArray((e, item)=>{
        if(e){
            res.send({msg:e})
        }
        if(item){
            console.log("stdyhsjhsjkhjksdhsdjkh ------"+item.length);
            res.json(item)
        }else{
            res.send({msg:'no data'})
        }
    });
});

router.get('/logout/', isloggedin, (req, res, next)=>{

    //var newusr = new user();
    //var db = req.db;
    
    //console.log(hashpsswrd);
    //user.local.email = "";
    //user.local.firstname = "";
    //user.local.lastname = "";
    //user.local.password = ""
    //console.log(user.local);
    //req.session.user.destroy();
    //req.session.destroy();
    
    req.session = null;
    res.send({msg:'doorclosed'});
    /*.destroy((err)=>{
        if(err){
            //req.session = null
            res.send({msg:err})
        }else{
            //console.log(session.email);
            //req.end();
            res.send({msg:'doorclosed'});
        }
    });*/
    //req.session.user = null;
    //console.log(req.session.user);
    
});

router.post('/login/', isloggedin, (req, res,next)=>{
    var db = req.db;
    var collctn = db.collection('user');
    var dbinstnce =0;
    var indx={};
    var cursor = collctn.find();
    var musjfkhgwhgh;
    cursor.toArray((e, usr)=>{
        if(e){
            res.send({msg: "this is the error:"+e});
        }
        
        for(var p =0; p < usr.length; p++){

            if((usr[p].local.email === req.body.email)){
                dbinstnce++;
                if(user.methods.validpass(req.body.password,usr[p].local.password) == true){
                    usr[p].local.password = null;
                    req.session.user = usr[p];
                    //req.session.user.local.password = null;
                    
                    if(req.session.user == usr[p]){

                        musjfkhgwhgh = true;
                        //console.log(req.session);
                        //console.log(req.session.user);
                    }else{
                        musjfkhgwhgh = false;
                    }
                     //console.log(user.methods.validpass(req.body.password,usr[p].local.password));
                    
                    indx["_"+dbinstnce] = p;
                }else{
                    musjfkhgwhgh = false;
                }
            }
        }
        
        if(dbinstnce == 1){
            if(musjfkhgwhgh == false){
                res.send({msg:'doorclosed'});
            }else{
                res.send({msg:'dooropen'});
            }
            //req.session.user = usr[indx._1];
            //console.log(req.session.user);
            
        }else if(dbinstnce == 0){
            res.send({msg: 'No users found, sign up!'});
        }else if(dbinstnce < 0){
            res.send({msg: 'Count error. Hackers not welcomed!'});
        }else if(dbinstnce > 1){
            for(var v=0;v<dbinstnce;v++){
                //console.log(usr[index["_"+v]]);
            }
            
            //console.log(dbinstnce)
            res.send({msg: 'multiple users found : '+dbinstnce});
        }
    });
});

router.post('/signup/',isloggedin,(req, res)=>{
    //var newusr = new user();
    var db = req.db;
    var collctn = db.collection('user');
    var hashpsswrd = user.methods.generatehash(req.body.password);
    
    //console.log(hashpsswrd);
    user.local.email = req.body.email;
    user.local.firstname = req.body.firstname;
    user.local.lastname = req.body.lastname;
    user.local.password = hashpsswrd;

    var dbinstance =0;
    var index={};
    var cursor = collctn.find();
    cursor.toArray((e, item)=>{
        if(e){
            console.log("Error occured while searching database: " + e);
            res.send({msg:e})
        }
        
        for(var i =0;i<item.length;i++){
            if(item[i].local.email == user.local.email){
                dbinstance++;
                index["_"+dbinstance] = i;
            }
        }
        //console.log(user)
        if(dbinstance == 0){
            collctn.insert(user,(err,r)=>{
                if(!err){
                    user.local.password = null;
                    req.session.user = user;
                    //console.log(r)
                    //user.local.password = '';
                    var resjson ={};
                    //
                    //var hashedid = user.methods.generatehash(user._id);
                    resjson.id = user._id;
                    
                    resjson.stat = "newuser";
                    resjson.info = user;
                    
                    mypages.dashboard.loggedin.showcomp = true;
                    if(user._id){
                        delete user._id;
                    }
                    //console.log(user);
                    
                    res.send({msg : resjson});
                    
                }else{
                    res.send({msg: "ERROR occured, error status:" + err});
                }
                    
            });
            
        }else{
            for(var v=0; v < dbinstance; v++){
                console.log(item[index["_"+v]]);
            }
            res.send({msg: "alreadyexsits"});
        }
    });
});

/*
router.post('/addmember', (req, res)=>{
    //var newusr = new user();
    var db = req.db;
    //console.log(db);
    var collctn = db.get('user');
    var passport = req.passport;
    var hashpsswrd = user.methods.generatehash(req.body.password);
    
    //console.log(hashpsswrd);
    user.local.email = req.body.email;
    user.local.password = hashpsswrd;
    
    
    passport.serializeUser((usr, done)=>{
        console.log(usr.id);
        done(null, usr.id);
    });
    
    passport.deserializeUser((id, done)=>{
        user.findById(id, (err, usr)=>{
            console.log(usr);
            done(err,usr);
        });
    });
    
    //console.log(user.local);
    
    collctn.insert(user,(err,results)=>{
            res.send(
                (err === null)?{msg:'update'}:{msg: err}
            );
        }
    );
});

router.post('/addmember',pssprt.authenticate('local-signup', {
        successRedirect:'../',
        failureRedirect: '/',
        failureFlash :true
    })
);*/

router.delete('/deluser/:id', (req, res)=>{
    var usrid = req.params.id;
    var db = req.db;
    var ObjectId = req.ObjectId;
    var collctn = db.collection('user');
    
    db.collection('user',(err, userr)=>{
        if(err){
            console.log(err);
            res.send({msg:err});
        }
        userr.remove({_id : ObjectId(usrid)},(er, ress)=>{
            if(er){
                console.log(er);
                res.send({msg:er});
            }
            console.log(ress);
            res.send({msg:'deleted'});
        });
    });
    
    //var cursor = collctn.deleteOne({'_id':usrid});
    
    
    /*collctn.deleteOne({_id: ObjectId(usrid)}).then((e,r)=>{
        console.log(r);
        res.send({msg:'deleted'});
    });*/
});

module.exports = router;