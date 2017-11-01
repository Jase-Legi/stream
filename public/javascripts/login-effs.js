"use strict";
var doc = document;
var win = window;
var usrlogincontainerbox = doc.getElementById("usrlogincontainerbox");
var usrsignuploginiconbutton = doc.getElementById("usrsignuploginiconbutton");
var loginpopout = doc.getElementById("loginpopout");
var firstNamebx = doc.getElementById("inputFirstname");
var lastNamebx = doc.getElementById("inputLastname");
var formtitle = doc.getElementById("formtitle");
var formm = doc.getElementById("formm");
var signupbttn = doc.getElementById("signupbutton");
var logintoplatfrmpbutton = doc.getElementById("logintoplatfrmpbutton");
var closemod = doc.getElementById("close-modal-sign-up");
var close_modal_login = doc.getElementById("close_modal_login");
var newmemform = doc.getElementById("newmember");
if(newmemform){
    var inputfields = newmemform.getElementsByTagName("input");
}
var wrapholder = doc.getElementById("wrapppp");
var loginwrapppp = doc.getElementById("loginwrapppp");
var addmmbr = doc.getElementById("addmemberbutton");
var addmbackid = doc.getElementById("addmbackid");
var signinmemberbutton = doc.getElementById("signinmemberbutton");

doc.addEventListener("DOMContentLoaded",function(event){
//(function(){
    if(closemod){
        closemod.addEventListener("click", (ev)=>{
            wrapholder.classList.remove("wrappppactive");
            wrapholder.classList.add("wrappppinactive");
        });
    }
    
    if(close_modal_login){
        close_modal_login.addEventListener("click", (ev)=>{
            //ev.preventDefault();
            loginwrapppp.classList.remove("wrappppactive");
            loginwrapppp.classList.add("wrappppinactive");
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
});
