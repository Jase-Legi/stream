var express = require('express');
const router = express.Router();
var userloggedinfo = require('../config/models/user.js');
var myPagesmsg = require('../config/models/pages.js');
var isloggedin = userloggedinfo.methods.isloggedin;
/* GET home page. */
var myPages = ["/","/about","/dashboard","/investors"];



for(var o = 0; o < myPages.length;o++){
    router.get(myPages[o],isloggedin, function(req, res, next) {
    
    //console.log("This is the current session: "+req.session.user);
        if(req.originalUrl == '/'){
            res.render('header', myPagesmsg.index.loggedin);
        }
        
        if(req.originalUrl == '/about'){
            res.render('about', myPagesmsg.about.loggedin);
        }
        
        if(req.originalUrl == '/dashboard'){
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
