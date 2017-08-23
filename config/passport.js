'use scrict';

var LocalStrategy = require('passport-local').Strategy;
var user = require('./models/user.js');
//var passport = require('passport');
var passportsess = require('express-session');
var monk = require('monk');


module.exports = function(passport){
    
    passport.serializeUser((usr, done)=>{
        done(null, usr.id);
    });
    
    passport.deserializeUser((id, done)=>{
        user.findById(id, (err, usr)=>{
            done(err,usr);
        });
    });
    
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback :true
    },
    (req, email, password, done)=>{
        process.nextTick( ()=>{
            
            var db = req.db;
            var colln = db.get('user');
            
            //console.log(newusr);
            colln.findOne({email:user.local.email},(err, usr)=>{
                if(err){
                    return done(err);
                }
                if(usr){
                    return done(null, false,req.flash('signupmsg', 'That username already exists, please enter another email'));
                }else{
                    
                    newusr.local.email = email;
                    newusr.local.password = newusr.methods.gerneratehash(password);
                    
                    var db = req.db;
                    var collctn = db.get('user');
                    collctn.insert(user.local,(er, results)=>{
                        if(er){
                            return done(er);
                        }else{
                            return done(null, newusr)
                        }
                    });
                }
            });
        });
    }                                        
                                                  
    ));
};