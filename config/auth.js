'use scrict';
var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var user = require('./models/user.js');

module.exports = {
    checkLogin: function(req, res, next) {
        if (req.session.hasOwnProperty('user')) {
            //if the user is logged in we pass through
            next();
        } else if (req.cookies.user == undefined || req.cookies.pass == undefined) {
            res.render('login', { title: 'Login' });
        } else {
            User.checkLogin(req.cookies.user, req.cookies.pass, true, function(o) {
                if (o != null) {
                    req.session.user = o;
                    next();
                } else {
                    res.render('login', { title: 'Login' });
                    return;
                }
            });
        }
    }
};