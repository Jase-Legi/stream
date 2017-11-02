var express = require('express');
var router = express.Router();

var myPagesmsg = {
    index:{
        loggedin:{ 
            title:'Dashboard',
            msg: 'dooropen',
            loginnow:false,
            mypageurl:'/dashboard'
        },
        loggedout:{ 
            title:'Zuggerat',
            msg: 'doorclosed',
            loginnow:false,
            mypageurl:'/'
        }
    },
    about:{
        loggedin:{ 
            title:'ABOUT US',
            msg: 'dooropen',
            //loginnow:true,
            mypageurl:'/about'
        },
        loggedout:{ 
            title:'ABOUT US',
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
            showcomp:Boolean,
            data:{},
            mypageurl:'/dashboard'
        },
        loggedout:{ 
            title:'Dashboard',
            msg: 'doorclosed',
            loginnow:true,
            mypageurl:'/'
        }        
    },
    investors:{
        loggedin:{ 
            title:'Investors',
            msg: 'dooropen',
            loginnow:false,
            mypageurl:'/investors'
        },
        loggedout:{ 
            title:'Zuggerat',
            msg: 'doorclosed',
            loginnow:true,
            mypageurl:'/'
        }
    },
    comingsoon:{
        loggedin:{ 
            title:'Coming Soon',
            msg: 'dooropen',
            loginnow:false,
            mypageurl:"/comingsoon"
        },
        loggedout:{ 
            title:'Coming Soon',
            msg: 'doorclosed',
            loginnow:false,
            mypageurl:"/comingsoon"
        }
    },
    vett:{
        loggedin:{ 
            title:'Vetting for talent',
            msg: 'dooropen',
            loginnow:false,
            mypageurl:"/vett"
        },
        loggedout:{ 
            title:'Vetting for talent',
            msg: 'doorclosed',
            loginnow:false,
            mypageurl:"/vett"
        }
    }
};

module.exports = myPagesmsg;