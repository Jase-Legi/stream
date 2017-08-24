'use strict';
var doc = document,
    win = window,
    hedr_menu = doc.getElementById("menusymbol"),
    hedr = doc.getElementById("header"),
    hedrlinks = hedr.getElementsByTagName("a"),
    menupopout = doc.getElementById("menupopout"),
    menuclose = doc.getElementById("closemenu"),
    abtus = doc.getElementById("AboutUS"),
    investorlnk = doc.getElementById("investorlink"),
    headrlogo = doc.getElementById("legilogo"),
    headrlogocontnr = doc.getElementById("logoheader");

doc.addEventListener("DOMContentLoaded",function(event){
    //console.log(hedrlinks[1]);
    hedr_menu.addEventListener('click', function(ev){
        //ev.preventDefault();
        menupopout.style.visibility = "visible";
    });
    
    menuclose.addEventListener('click', function(ev){
        //ev.preventDefault();
        menupopout.style.visibility = "hidden";
    });
   
    abtus.addEventListener('click', function(ev){
        ev.preventDefault();
        //window.location.href = '/about';
        var url = abtus.getAttribute("rel");
        window.location.href = url;
    
    });
    
    headrlogocontnr.addEventListener('click', function(ev){
        ev.preventDefault();
        //window.location.href = '/about';
        var url = headrlogocontnr.getAttribute("rel");
        window.location.href = url;
    
    });

    investorlnk.addEventListener('click', function(ev){
        ev.preventDefault();
        var url = investorlnk.getAttribute("rel");
        window.location.href = url;
    
    });

    var firstimgurl;
    headrlogocontnr.addEventListener("mouseover", ()=>{
        firstimgurl = headrlogo.getAttribute('src');
        headrlogo.setAttribute('src','images/iibanc resources/logo alternates/iibanc2.svg');
    });
    
    headrlogocontnr.addEventListener("mouseout", ()=>{
        headrlogo.setAttribute('src',firstimgurl);
    });
    
    /*headrlogocontnr.addEventListener("click", (e)=>{
        e.preventDefault();
        url = this.getAttribute("rel");
        window.location.href = url;
    });*/
    
});