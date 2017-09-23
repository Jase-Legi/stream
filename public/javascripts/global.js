"use strict";
var doc = document, 
    win = window,
    userlistdata = [],
    url = 'users/userinfo/',
    addmemberurl = 'users/signup/',
    delmemberurl = "users/deluser/",
    logouturl = "users/logout/",
    log_out = doc.getElementById('logoutbutton'),
    usrlist = doc.getElementById("userlist"),
    uusrnme = doc.getElementById("username"),
    emmail = doc.getElementById("email"),
    addmemberbutton = doc.getElementById("addmemberbutton");
var delusr = doc.getElementById("delete");
var addmember = doc.getElementById("newmember");
var inputs =(addmember)? addmember.getElementsByTagName("input"):null;

var login_to_memberprofle = doc.getElementById("login_to_memberprofle");
var logininputs =(login_to_memberprofle)? login_to_memberprofle.getElementsByTagName("input"):null;
var inputFirstname = doc.getElementById('inputFirstname'),
    inputLastname = doc.getElementById('inputLastname'),
    inputemail = doc.getElementById("inputemail"),
    inputlocation = doc.getElementById("inputlocation"),
    psswrd = doc.getElementById('inputpassword'),
    loginbuttn = doc.getElementById('signinmemberbutton'),
    del1 = doc.getElementsByClassName('del1'),
    wrapholder = doc.getElementById("wrapppp"),
    userdata = {};


var getjsn = function(url,callback, method){
    var meth = method || "GET";
    var xhr;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhr = new XMLHttpRequest();
     } else if (window.ActiveXObject){
        // code for old IE browsers
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onload = function(){
        
        var sttus = xhr.status;
        
        if(xhr.readyState == 4) {
            if(xhr.status == 200){
                callback(null, xhr.response);    
            }else{
                console.log("error occured, status code:"+ xhr.status);
            }   
        }else{
            callback(sttus);
        }
    };
    xhr.open(meth, url, true);
    xhr.responseType = "json";    
    xhr.send();
};

var postthisdata = function(url, callbck, data){
    var xhr;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhr = new XMLHttpRequest();
     } else if (window.ActiveXObject){
        // code for old IE browsers
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }  
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                //console.log(typeof xhrr.response);
                callbck(null, xhr.response);
            }else if ( (xhr.response != "") && (xhr.response)){
                console.log("LOADING...");
            }
            //console.log("kjchddjhc hiii yoouuu");
        } else if(xhr.status === 200){
            console.log("data has been sent, please wait; Readystate: "+xhr.readyState);
        }
    };
    xhr.open("POST", url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(data));
};

//CLOSES MODAL WINDOWS-- ACCEPTS ARRAY OF VALUES 2 CLOSE
var close_modal_windows = function(closers, closees){
    if(Array.isArray(closers)){
        for(var v=0; v<closers.length;v++){
            closers[v].addEventListener('click',()=>{
                closees.style.display = "none";
            });
        }
    }else{
        closers.addEventListener('click',()=>{
            doc.getElementById(closees).style.display = "none";
        });
    }
};

var loginn = function(postfunct,div,data){
    var errcount = 0;
    var fieldemptyerror = {};
    
    fieldemptyerror.errmsg = function(em,pss){
        if((pss == 1) && (em == 1)){
            return 'Please complete all fields.'; 
        }
        if(pss == 1){
            return 'Please enter your password.'; 
        }
        if (em == 1){
            return 'Please enter your email address.'; 
        }
    };
    var loginurl = div.getAttribute('rel');
    
    for(var i=0; i<logininputs.length; i++){
        if(logininputs[i].value == ''){
            if(logininputs[i].getAttribute('name') =='email'){
                errcount++;
                fieldemptyerror.email = 1;
            }else if(logininputs[i].getAttribute('name') =='password'){
                errcount++;
                fieldemptyerror.password = 1;
            }
        }else{
            if(logininputs[i].getAttribute('name') == 'email'){
                data.email = logininputs[i].value;
            }

            if(logininputs[i].getAttribute('name') == 'password'){
                data.password = logininputs[i].value;
            }
        }
    }
    
    //console.log(data);
    if(errcount === 0){
        var errcount = 0;
        postfunct(loginurl,(er, info)=>{
            if(!er){
                fieldemptyerror.email=0;
                fieldemptyerror.password=0;
                //console.log(info.msg+'---'+er);
                for(var i=0; i<logininputs.length; i++){
                    logininputs[i].value = '';
                }
                //wrapholder.style.visibility = "hidden";
                window.location.href = '/dashboard';
            }else{
                console.log('error occured at global in admember function at line 280. Error deatails:'+data.msg)
            }
        }, data);
    }else{
        console.log(fieldemptyerror.errmsg(fieldemptyerror.email,fieldemptyerror.password));
    }
    //console.log(data);
    
}

var logout = function(logoutur){
    getjsn(logoutur,(e, data)=>{
        if(e == null){
            console.log('after logout msg sent is: '+data.msg);
            window.location.href = '/';
            //populateTable(url,usrlist,data.msg);
        }else{
            console.log("an error occured. ERROR: "+data.msg)
        }
    });
};

var populateTable = function(url,divv,msg, deldiv){
    var tablestuff = '';
    if(divv){
        getjsn(url, (e, data)=>{

            if(e == null){

                //var data = /*JSON.parse(data)*/
                if(data.msg ==='doorclosed'){
                    console.log('you can\'t do that because you\'re not logged in. msg returned:'+data.msg);
                }

                if(msg === 'deleted'){
                    var arr = deldiv.match(/del(.*)/);
                    if (arr != null) { // Did it match?
                        var indexofdiv = parseInt(arr[1]);
                        console.log("index of div is : "+indexofdiv);

                        for(var b = 0; b < divv.children.length; b++){
                            divv.children[b].children[indexofdiv].remove();
                        }

                        var deletedivs = doc.getElementsByClassName('delcontent');

                        for(var p = 0; p < deletedivs.length; p ++){
                            var pp = (p + 1);
                            deletedivs[p].children[0].setAttribute('id','del'+pp);
                        }                    

                    }
                }
                else{
                    for(var i = 0; i < data.length ; i++){
                        for(var b = 0; b < divv.children.length; b++){

                            var nameofkey = divv.children[b].getAttribute('id');
                            //console.log(nameofkey);
                            //console.log(data[i].local.email);
                            for(var key in data[i].local){

                                if (key === nameofkey){
                                    if(msg === 'update' || msg === 'newuser' ){
                                        if(i === (data.length-1)){
                                            var z = document.createElement('div');
                                            z.className = "content";
                                            tablestuff = data[i].local[key];
                                            z.innerHTML =  tablestuff;
                                            divv.children[b].appendChild(z);
                                        }
                                    }else{
                                        var z = document.createElement('div');
                                        z.className = "content";
                                        console.log(data[i].local.email);
                                        tablestuff = data[i].local[key];
                                        z.innerHTML =  tablestuff;
                                        divv.children[b].appendChild(z);
                                    }
                                }

                            }

                            if(msg === 'update' || msg === 'newuser'){
                                if(i === (data.length-1)){

                                    if(nameofkey === "delete"){
                                        var z = document.createElement('div');
                                        z.className = "delcontent";
                                        var boo = (i+1)
                                        tablestuff = "<a class = 'delthis' id='del"+boo+"' href='#' rel='"+data[i]._id+"'>Delete</a>";
                                        z.innerHTML =  tablestuff;
                                        divv.children[b].appendChild(z);   
                                        wrapholder.style.visibility = "hidden";
                                    }
                                }

                            }else{

                                if(nameofkey === "delete"){
                                    var z = document.createElement('div');
                                    z.className = "delcontent";
                                    var boo = (i+1)
                                    tablestuff = "<a class = 'delthis' id='del"+boo+"' href='#' rel='"+data[i]._id+"'>Delete</a>";
                                    z.innerHTML =  tablestuff;
                                    divv.children[b].appendChild(z);            
                                }

                                if(nameofkey === 'yaloggedin'){
                                    wrapholder.style.visibility = "hidden";         
                                }

                            }
                        }
                    }

                }

            }else{

                console.log("something went wrong! An error: "+e+" ----occured.");

            }
        });
    }
};

var addnewMEMBER = function(addmemberurl, callback){
    
    //event.preventDefault();
    
    var errcount = 0;
    
    //var inputs = addmember.getElementsByTagName('input');
    for(var i=0; i<inputs.length; i++){
        
        console.log( 'input length: '+inputs.length);
        
        if(inputs[i].value === ''){
            errcount++;
        }
    }    
    
        
    if(errcount === 0){

        var userinfo ={'firstname':inputFirstname.value,'lastname':inputLastname.value,'email':inputemail.value,'password':psswrd.value
        };
        
        postthisdata(addmemberurl,callback,userinfo);
        
    }else{
        console.log("Please complete all required fields!")
    }
    
};

var delmember = function(url, callbck, divv){
    
    var delthis = doc.getElementsByClassName('delthis');
    var delthiss = doc.getElementById(divv);

    var confirmation = confirm("are you sure you want to delete this member?");
    //console.log(delthis[0]+" --divv.get id is: "+divv);
    
    if(confirmation === true){
        //console.log(delthiss.getAttribute('rel'));
        var delurll = delmemberurl+delthiss.getAttribute('rel');
        getjsn(delurll,callbck,'DELETE');
    }
    
};

(function() {
//doc.addEventListener("DOMContentLoaded",function(event){
    console.log(window.location.pathname);
    //setInterval(populateTable(url,usrlist), 1000);
    populateTable(url,usrlist);
    
    if(addmemberbutton){
        addmemberbutton.addEventListener('click', (event)=>{
            //event.preventDefault();

            addnewMEMBER(addmemberurl,(e, data)=>{
                if(e == null){
                    console.log(data.msg);
                    populateTable(url,usrlist,data.msg);
                    
                    for(var i=0; i<inputs.length; i++){
                        inputs[i].value = '';
                    }
                    
                    window.location.href = '/dashboard';
                }else{
                    console.log('error occured at global in admember function at line 280. Error deatails:'+data.msg)
                }
            });
        });
    }
    
    
    doc.querySelector('body').addEventListener('click', function(event) {
        //event.preventDefault();
        
        if (event.target.getAttribute('class') === "delthis") {
            
            delmember(delmemberurl, (er, data)=>{
                console.log(event.target.getAttribute('id'));

                if(er === null ){
                    console.log(data.msg);
                    populateTable(url,usrlist,data.msg,event.target.getAttribute('id'));
                    

                    //for(var p = 0;delusr.children

                }else{
                    console.log(data.msg);
                    populateTable(url,usrlist);

                }
            }, event.target.getAttribute('id'));
        }
        
    });
    
    if(loginbuttn){
        loginbuttn.addEventListener("click", (event)=>{
                loginn(postthisdata,loginbuttn,userdata);
        });
    
    }
    
    if(log_out){
        log_out.addEventListener("click", function(event){
            //event.preventDefault();
            logout(logouturl);
        });
    }
    
})();