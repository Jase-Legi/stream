'use strict';
var express = require('express');
//var router = express.Router();
//var bcrypt = require('bcrypt-nodejs');

var investschema = {
    id:String,
    email:String,
    amount:0,
    msg:String
};

module.exports = investschema;