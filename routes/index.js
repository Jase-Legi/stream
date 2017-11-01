var express = require('express');
const router = express.Router();
var userloggedinfo = require('../config/models/user.js');
var myPagesmsg = require('../config/models/pages.js');
var isloggedin = userloggedinfo.methods.isloggedin;
/* GET home page. */
<<<<<<< HEAD
var myPages = ["/","/about","/dashboard", "/investors", "/comingsoon","/vett"];
=======
var myPages = ["/","/about","/dashboard", "/investors", "/comingsoon"];
>>>>>>> dc32ed6b7e8fae97b38d020c34a23e3bad8fa94c



for(var o = 0; o < myPages.length;o++){
    router.get(myPages[o],isloggedin, function(req, res, next) {
    
    //console.log("This is the current session: "+req.session.user);
        if(req.originalUrl == '/about'){
            res.render('about', myPagesmsg.about.loggedin);
        }
        
        if(req.originalUrl == "/comingsoon"){
<<<<<<< HEAD
            res.render('landingpage', myPagesmsg.comingsoon.loggedin);
        }

        if(req.originalUrl == "/vett"){
            res.render('vett', myPagesmsg.about.loggedin);
=======
            res.render('landingpage', myPagesmsg.about.loggedin);
>>>>>>> dc32ed6b7e8fae97b38d020c34a23e3bad8fa94c
        }
        
        if(req.originalUrl == '/dashboard'){
            //myPagesmsg.dashboard.loggedin.data.id = null;
            console.log(myPagesmsg.dashboard.loggedin.data)
            
            
            res.render('dashboard',myPagesmsg.dashboard.loggedin);
        }
        
        if(req.originalUrl == '/investors'){
            res.render('investors',  myPagesmsg.investors.loggedin);
        }
        
    });
}

/*
router.get('/',isloggedin, function(req, res, next) {
 
    console.log("This is the current session: "+req.session.user);
        res.render('header',{msg: 'dooropen'})
});

router.get('/about',isloggedin,(req, res, next)=>{
   res.render('about',{title:"ABOUT",msg: 'dooropen', loginnow:true}); 
});

router.get('/dashboard',isloggedin,(req, res, next)=>{
    
        res.sendFile('dashboard.pug',{msg: 'dooropen', loginnow:true,title:"dashboard"})
});*/

module.exports = router;
