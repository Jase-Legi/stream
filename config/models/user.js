'use strict';
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
//var monk = require('monk');

var myPagesmsg = require('./pages.js');
//var mongoose = require('mongoose');

//process.setMaxListeners(0);

var Userschema = {
    //_id:'',
    local : {
        email : String,
        firstname : String,
        lastname : String,
        password : String
    },
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    },
    compprofile:{
        investor:{
            
        },
        raiser:{
            verified:false,
            compname:String,
            industry:String,
            description:String,
            seekingValue:0,
            raised:0,
            investors:[],
            reviews:[
                {
                    email:String,
                    review:String,
                    rating:0
                }
            ]
        }
    },
    methods : {   }
};

//var userschema = new Userschema();
Userschema.methods.generatehash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Userschema.methods.validpass = function(password, hashedpass){
    return bcrypt.compareSync(password, hashedpass);
};

Userschema.methods.isloggedin = function(req, res, next){
    if(req.session.user){
        req.loggedstat = true;
        
        if(req.originalUrl == '/'){
            res.render('dashboard',myPagesmsg.dashboard.loggedin);

        }
        if(req.originalUrl == '/about'){
            next();
        }
        if(req.originalUrl == '/dashboard'){
            next();
        }
        
        if(req.originalUrl == '/users/userinfo/'){
            //res.send({msg:'doorclosed'})
            next();
        }
        
        if(req.originalUrl == '/users/signup/'){
            res.send({msg:'dooropen'});
            //next();
        }
        
        if(req.originalUrl == '/users/logout/'){
            next();
        }
        
        if(req.originalUrl == '/users/login/'){
            res.send({msg:'dooropen'});
        }
        
        if(req.originalUrl == '/admin/compcreate/'){
            next();
        }

        if(req.originalUrl == '/investors'){
            next();
        }

    }
    else{
        //res.status(200).send({msg:'yanotloggedin'});
        //res.send({title:'login',msg:'doorclosed'});
        //res.send({title:'login',msg:'doorclosed', url: req.originalUrl});
        //if(req.session.user){
        req.loggedstat = false;

        if(req.originalUrl === '/'){
            //myPagesmsg.index.msg = 'doorclosed';
            res.render('header',myPagesmsg.index.loggedout);
        }
        
        if(req.originalUrl === '/about'){
            //myPagesmsg.about.msg = 'doorclosed';
            res.render('about',myPagesmsg.about.loggedout);
        }      
        
        if(req.originalUrl === '/dashboard'){
            res.render('header',myPagesmsg.dashboard.loggedout)
        }
        
        if(req.originalUrl === '/users/userinfo/'){
            res.send({msg: 'doorclosed',loginnow: false})
            //next();
        }        
        
        if(req.originalUrl === '/users/signup/'){
            
            next();
        }        
        if(req.originalUrl === '/users/logout/'){
            res.send({msg:'doorclosed'});
            //next('route');
        }
        
        if(req.originalUrl === '/users/login/'){
            next();
        }
        
        if(req.originalUrl == '/admin/compcreate/'){
            res.send({msg:req.body});
        }
        
        if(req.originalUrl == '/investors'){
            res.render('header',myPagesmsg.dashboard.loggedout)
        }        
    }
};

//userchema.methods.validpass = ;

module.exports = Userschema;