'use strict';
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

var companyprofile = {
    email:String,
    profile:{
        investor:{
            status:false,
            investments:[{compid:String, amount:0, message:String}]
        },
        fundraiser:{
            verified:false,
            compname:String,
            industry:String,
            description:String,
            amount:0,
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
    }
};

module.exports = companyprofile;