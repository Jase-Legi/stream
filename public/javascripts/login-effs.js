'use strict';
var doc = document,
    win = window,
    loginpopout = doc.getElementById("loginpopout"),
    loginbutton = doc.getElementById("loginbutton"),
    firstNamebx = doc.getElementById("inputFirstname"),
    lastNamebx = doc.getElementById("inputLastname"),
    formtitle = doc.getElementById("formtitle"),
    formm = doc.getElementById("formm"),
    loginbutton = doc.getElementById("loginbutton"),
    signupbttn = doc.getElementById("signupbutton"),
    closemod = doc.getElementById("close-modal-sign-up"),
    newmemform = doc.getElementById("newmember"),
    inputfields = newmemform.getElementsByTagName("input"),
    wrapholder = doc.getElementById("wrapppp"),
    addmmbr = doc.getElementById("addmemberbutton"),
    addmbackid = doc.getElementById("addmbackid"),
    signinmemberbutton = doc.getElementById("signinmemberbutton"),
    newmemform = doc.getElementById("newmember");

var showlogin = function(form,inputfields, emailfield, passwordfield, loginbttn,signupppbttn, htwo){
    htwo.style.display = 'none';
    for(var i =0;i <inputfields.length;i++){
        if(inputfields[i].getAttribute('name') != 'email' && inputfields[i].getAttribute('name') != 'password'){
            inputfields[i].style.display = 'none';
            inputfields[i].classList.add('inactive');
        }
    }
    
    if(!doc.getElementById('formtitle2')){
        var z = doc.createElement('h2');
        z.innerHTML = 'SIGN IN';
        z.id = "formtitle2";
        form.prepend(z);
    }
    
    signupppbttn.style.display = 'none';
    //signupppbttn.style.visibility = 'hidden';
    signupppbttn.classList.add('inactive');
    //this.style.display = 'none';
    loginbttn.style.display = 'block';
};

var closefunc = function(form,inputfields, emailfield, passwordfield, loginbttn,signupbttn, htwo, divv){
    htwo.style.display = 'block';
    for(var i =0;i <inputfields.length;i++){
        if(inputfields[i].getAttribute('name') != 'email' || inputfields[i].getAttribute('name') != 'password'){
            inputfields[i].style.display = 'contents';
            inputfields[i].classList.remove('inactive')
        }
    }
    
    if(doc.getElementById('formtitle2')){
        doc.getElementById('formtitle2').style.display = 'none';
    }
    
    if(signupbttn.style.display == 'none'){
        signupbttn.style.display = 'contents';
    }
    
    if(loginbttn.style.display != 'none'){
        loginbttn.style.display = 'none';
    }
    
    //this.style.display = 'none';
    divv.style.display = 'none';
};

doc.addEventListener("DOMContentLoaded",function(event){
    
    closemod.addEventListener("click", function(){ 
        closefunc(newmemform,inputfields,doc.getElementById('inputemail'),doc.getElementById('inputpassword'),signinmemberbutton,addmmbr,formtitle, wrapholder);
    });
    
    if(signupbttn){
        signupbttn.addEventListener("click", function(){
            wrapholder.style.display = "block";
        });
    }
    
    loginpopout.addEventListener("click", function(){
        closefunc(newmemform,inputfields,doc.getElementById('inputemail'),doc.getElementById('inputpassword'),signinmemberbutton,addmmbr,formtitle, wrapholder);
    });
    
    loginbutton.addEventListener("click", ()=>{
        showlogin(newmemform,inputfields,doc.getElementById('inputemail'),doc.getElementById('inputpassword'),signinmemberbutton,addmmbr,formtitle);
        
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
    
    closemod.addEventListener("mouseover", function(){
        closemod.style.backgroundColor = "red";
    });
    
    closemod.addEventListener("mouseout", function(){
        closemod.style.backgroundColor = "#222222";
    });
    
});
