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
        
        //Loggedin redirects
        if(req.originalUrl == '/'){
            return res.redirect('/dashboard');

        }
        
        //Loggedin proceeds to next function
        next();
    }
    else{
        req.loggedstat = false;

        if(req.originalUrl === '/'){
            //myPagesmsg.index.msg = 'doorclosed';
            //myPagesmsg.index.loggedout.loginnow = false;
            res.render('header',myPagesmsg.index.loggedout);
        }
        
        if(req.originalUrl === '/about'){
            //myPagesmsg.about.msg = 'doorclosed';
            res.render('about',myPagesmsg.about.loggedout);
        }      
        
        if(req.originalUrl === '/dashboard'){
            //myPagesmsg.index.loggedout.loginnow = true;
            return res.redirect('/');
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