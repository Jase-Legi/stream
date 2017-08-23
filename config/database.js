var express = require('express'),
    router = express.Router();

module.exports  = {
    //url : "127.0.0.1:27017/testapp"
    url : process.env.DB_URI
}