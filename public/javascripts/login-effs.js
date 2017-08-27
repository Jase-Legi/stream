"use strict";
var doc = document;
var win = window;
var usrlogincontainerbox = doc.getElementById("usrlogincontainerbox");
var usrsignuploginiconbutton = doc.getElementById("usrsignuploginiconbutton");
var loginpopout = doc.getElementById("loginpopout");
var loginbutton = doc.getElementById("loginbutton");
var firstNamebx = doc.getElementById("inputFirstname");
var lastNamebx = doc.getElementById("inputLastname");
var formtitle = doc.getElementById("formtitle");
var formm = doc.getElementById("formm");
var signupbttn = doc.getElementById("signupbutton");
var logintoplatfrmpbutton = doc.getElementById("logintoplatfrmpbutton");
var closemod = doc.getElementById("close-modal-sign-up");
var newmemform = doc.getElementById("newmember");
if(newmemform){
    var inputfields = newmemform.getElementsByTagName("input");
}
var wrapholder = doc.getElementById("wrapppp");
var loginwrapppp = doc.getElementById("loginwrapppp");
var addmmbr = doc.getElementById("addmemberbutton");
var addmbackid = doc.getElementById("addmbackid");
var signinmemberbutton = doc.getElementById("signinmemberbutton");

var showlogin = function(form,inputfields, emailfield, passwordfield, loginbttn,signupppbttn, htwo){
    htwo.style.display = "none";
    for(var i =0;i <inputfields.length;i++){
        if(inputfields[i].getAttribute("name") != "email" && inputfields[i].getAttribute("name") != "password"){
            inputfields[i].style.display = "none";
            inputfields[i].classList.add("inactive");
        }
    }
    
    if(!doc.getElementById("formtitle2")){
        var z = doc.createElement("h2");
        z.innerHTML = "SIGN IN";
        z.id = "formtitle2";
        form.prepend(z);
    }
    
    signupppbttn.style.display = "none";
    //signupppbttn.style.visibility = 'hidden';
    signupppbttn.classList.add("inactive");
    //this.style.display = 'none';
    loginbttn.style.display = "block";
};

var closefunc = function(form,inputfields, emailfield, passwordfield, loginbttn,signupbttn, htwo, divv){
    htwo.style.display = "block";
    
    for(var i =0;i <inputfields.length;i++){
        if(inputfields[i].getAttribute("name") != "email" || inputfields[i].getAttribute("name") != "password"){
            inputfields[i].style.display = "contents";
            inputfields[i].classList.remove("inactive")
        }
    }
    
    if(doc.getElementById("formtitle2")){
        doc.getElementById("formtitle2").style.display = "none";
    }
    
    if(signupbttn.style.display == "none"){
        signupbttn.style.display = "contents";
    }
    
    if(loginbttn.style.display != "none"){
        loginbttn.style.display = "none";
    }
    
    //this.style.display = 'none';
    divv.style.display = "none";
};

doc.addEventListener("DOMContentLoaded",function(event){
//(function(){
    if(closemod){
        closemod.addEventListener("click", (ev)=>{
            ev.preventDefault();
            wrapholder.classList.remove("wrappppactive");
            wrapholder.classList.add("wrappppinactive");
            //closefunc(newmemform,inputfields,doc.getElementById("inputemail"),doc.getElementById("inputpassword"),signinmemberbutton,addmmbr,formtitle, wrapholder);
        });
    }
    
    if(signupbttn){
        signupbttn.addEventListener("click", function(){
            wrapholder.classList.remove("wrappppinactive");
            wrapholder.classList.add("wrappppactive");
            //wrapholder.style.display = "block";
        });
    }
    
    if(logintoplatfrmpbutton){
        logintoplatfrmpbutton.addEventListener("click", function(){
            loginwrapppp.classList.remove("wrappppinactive");
            loginwrapppp.classList.add("wrappppactive");
            //wrapholder.style.display = "block";
        });
    }
    
    /*
    loginpopout.addEventListener("click", function(){
        closefunc(newmemform,inputfields,doc.getElementById("inputemail"),doc.getElementById("inputpassword"),signinmemberbutton,addmmbr,formtitle, wrapholder);
    });
    */
    
    if(loginbutton){
        loginbutton.addEventListener("click", ()=>{
            showlogin(newmemform,inputfields,doc.getElementById("inputemail"),doc.getElementById("inputpassword"),signinmemberbutton,addmmbr,formtitle);

            /*
            //var ths = loginbutton;
            firstNamebx.style.display ='none';
            lastNamebx.style.display ='none';
            formtitle.style.display ='none';
            addmmbr.style.display ='none';
            var z = doc.createElement('h2');
            z.innerHTML = 'SIGN IN';
            formm.prepend(z);
            loginbutton.style.display ='none';
            signinmemberbutton.style.display ='block';
            */
        });
    
        
    }

    if(closemod){
        closemod.addEventListener("mouseover", function(){
            closemod.style.backgroundColor = "red";
        });

        closemod.addEventListener("mouseout", function(){
            closemod.style.backgroundColor = "#222222";
        });
    }
});
