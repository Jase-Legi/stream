var express = require('express');
var router = express.Router();

var myPagesmsg = {
    index:{
        loggedin:{ 
            title:'Zuggerat',
            msg: 'dooropen',
            //loginnow:false,
            mypageurl:'/'
        },
        loggedout:{ 
            title:'Zuggerat',
            msg: 'doorclosed',
            //loginnow:true,
            mypageurl:'/'
        }
    },
    about:{
        loggedin:{ 
            title:'About Us',
            msg: 'dooropen',
            //loginnow:true,
            mypageurl:'/about'
        },
        loggedout:{ 
            title:'About Us',
            msg: 'doorclosed',
            //loginnow:true,
            mypageurl:'/about'
        }
    },
    dashboard:{
        loggedin:{ 
            title:'Dashboard',
            msg: 'dooropen',
            loginnow:false,
            mypageurl:'/dashboard'
        },
        loggedout:{ 
            title:'Dashboard',
            msg: 'doorclosed',
            loginnow:true,
            mypageurl:'/dashboard'
        }        
    }
};

module.exports = myPagesmsg;