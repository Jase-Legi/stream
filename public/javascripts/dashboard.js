'use strict';

var doc = document,
    win = window,
    new_form = doc.getElementById("new_form"),
    inputcomp = new_form.children,
    selectcomp = newcompany_form.getElementsByTagName("select"),
    textareacomp = newcompany_form.getElementsByTagName('textarea'),
    compDescr = doc.getElementById('compDescr'),
    comp_creat_submit_bttn = doc.getElementById('create_comp_button'),
    compcrturl = 'admin/compcreate/',
    compcreate_wrap = doc.getElementById('compcreate_wrap'),
    invstthispop = doc.getElementById('invstthispop'),
    invstnowwrap = doc.getElementById('invstnowwrap'),
    dwrraap = doc.getElementById('dwrraap'),
    comp_prof_urls = 'admin/getothercomps/',
    compny_create_close_popout = doc.getElementById('compny_create_close_popout'),
    close_investmodal = doc.getElementById("close_investmodal"),
    dashboardboxcont = doc.getElementById('dashboardboxcont'),
    weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    compny_create_popout = doc.getElementById('compny_create_popout'),
    invsamountforthscmp = doc.getElementById("invsamountforthscmp"),
    companynamespanele = doc.getElementById("companynamespanele"),
    invstnowwrapmodal_popout = doc.getElementById("invstnowwrapmodal_popout");

        
var creatnewcompprofile = function(createurl, callback){
    var errcnt = 0;
    var vals = {};
    for(var i=0;i<inputcomp.length;i++){
        if(inputcomp[i].getAttribute('class') != 'notincluded'){
            if(inputcomp[i].getAttribute("type") != "range"){            
                if(inputcomp[i].value == '') {
                    errcnt ++;
                    console.log(inputcomp[i].tagName+'++++');
                }
            }else{
                if(inputcomp[i].value == 0) {
                    errcnt ++;
                    console.log(inputcomp[i].tagName+'++++');
                }
            }
        }
    }
    
    console.log(errcnt);
    if(errcnt == 0){
        for(var i=0;i<inputcomp.length;i++){
            
            if(inputcomp[i].getAttribute('class') != 'notincluded'){
                vals[inputcomp[i].getAttribute('name')] = inputcomp[i].value;
                inputcomp[i].value = (inputcomp[i].getAttribute("type")=="range")?0:'';
            }
        }
        postthisdata(createurl,callback,vals);
        
    }
};

var dispcompprofiles = function(compprofurls,divele){

    getjsn(compprofurls, (e, findings)=>{
        if(e){
            console.log(e);
        }else{
            if(findings.error){
                console.log(findings.error);
            }else if(findings.content){
                for(var p = 0;p<findings.content.length;p++){
                    
                    //console.log(findings.content[p]);
                    var pooop = parseInt(findings.content[p]._id.toString().substr(0,8), 16)*1000; 
                    var d = doc.createElement('div');
                    d.className = 'featured-investments-iconbox';
                    d.innerHTML = (findings.sessemail == findings.content[p].email)?'':'<div id="invstthispop'+findings.content[p]._id+'" class="pluss" title="Invest in this company!">'
                    +'<img id="invstincmp'+findings.content[p]._id+'" class="svggg" height="100%" src="/images/iibanc resources/icons/invsticon.svg"/></div>';
                    d.innerHTML +='<div class="featured-investments-logo"><img height="100%" src="images/iibanc resources/icons/ziggurat  watermark.svg"/></div><div class="featured-investments-iconinfo"><h4 style="margin:0px;">' + findings.content[p].profile.fundraiser.compname + '</h4><p style="margin:0px;">email: '+ findings.content[p].email + '<br/>bio: '+findings.content[p].profile.fundraiser.description + '</p><p style="font-size:9px;">Created: '+weekday[new Date(pooop).getDay()] +':- '+ Month[new Date(pooop).getMonth()] +', '+ new Date(pooop).getDate()+',  '+ new Date(pooop).getFullYear() +'</p></div>';
                    //console.log(divele)
                    d.setAttribute("data-thisob-id", findings.content[p]._id);
                    d.setAttribute("data-thisob-name", findings.content[p].profile.fundraiser.compname);
                    d.setAttribute("data-thisob-amount", findings.content[p].profile.fundraiser.amount);
                    divele.appendChild(d);
                    
                }
            }
        }
    });
    
};

var get_dynamic_ele = function(ele,id,classs,thefunc){
    if(id){
        doc.querySelector('body').addEventListener("click", (ev)=>{
            if(ev.target.getAttribute("id") == id){
                thefunc();
            }
        });
    }

    if(classs){
        doc.querySelector('body').addEventListener("click", (ev)=>{
            if(ev.target.getAttribute("class") == classs){
                thefunc();
            }
        });
    }
    
};

/*
var investinthiscomp = function(){
    
}
*/
(function() {
//doc.addEventListener("DOMContentLoaded",function(event){
    
    dispcompprofiles(comp_prof_urls,dashboardboxcont);
    
    var invstincmp = doc.getElementById("invstincmp");
    var pluss = doc.getElementsByClassName("pluss");
    
    /*
    doc.querySelector('body').addEventListener("mouseover", function(event) {
        //event.preventDefault();
        
        if (event.target.getAttribute('id') == "invstincmp") {
            event.target.setAttribute("src","/images/iibanc resources/icons/invsticon2.svg");
        }
    });
    
    doc.querySelector('body').addEventListener("mouseout", function(event) {
        //event.preventDefault();
        
        if (event.target.getAttribute('id') == "invstincmp") {
            event.target.setAttribute("src","/images/iibanc resources/icons/invsticon.svg");
        }
    });
    */
    
    dwrraap.addEventListener('click',()=>{
        compcreate_wrap.style.display ='block';
    });
    
    doc.querySelector('body').addEventListener("click", (ev)=>{
        if(ev.target.getAttribute("id") == "invstincmp"+ev.target.parentElement.parentElement.getAttribute("data-thisob-id")){
            console.log(ev.target.getAttribute("id"));
            invstnowwrap.style.display ='block';
            invstnowwrap.setAttribute("data-thisob-id",ev.target.parentElement.parentElement.getAttribute("data-thisob-id"));
            companynamespanele.innerHTML = " " + ev.target.parentElement.parentElement.getAttribute("data-thisob-name");
            invsamountforthscmp.innerHTML = ev.target.parentElement.parentElement.getAttribute("data-thisob-amount").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            
        }
    });
    
    //CLOSE CREATE COMPANY MODAL WINDOW
    close_modal_windows([compny_create_close_popout,compny_create_popout],compcreate_wrap);
   
    ////////////////////////////////////
    
    //CLOSE CREATE COMPANY MODAL WINDOW-- USES FUNCTION close_modal_windows FROM global.js accessed via header
    close_modal_windows([invstnowwrapmodal_popout,close_investmodal],invstnowwrap);
    ////////////////////////////////////
    comp_creat_submit_bttn.addEventListener('click',()=>{
        
        creatnewcompprofile(compcrturl,(e,info)=>{
            if(e){
                console.log(e+info.msg);
                
            }else{
                //console.log(info);
                compcreate_wrap.style.display = 'none';
                //console.log(info);
                var pooop = parseInt(info.id.toString().substr(0,8), 16)*1000; 
                var d = doc.createElement('div');
                d.className = 'featured-investments-iconbox';
                d.innerHTML = '<div class="featured-investments-logo"><img height="100%" src="images/Legiframework.png"/></div><div class="featured-investments-iconinfo"><h4 style="margin:0px;">' + info.comp.profile.fundraiser.compname+ '</h4><p style="margin:0px;">email: ' + info.comp.email+ '<br/>bio:' + info.comp.profile.fundraiser.description + '</p><p style="font-size:9px;">Created: '+ weekday[new Date(pooop).getDay()] +':- '+ Month[new Date(pooop).getMonth()] +', '+ new Date(pooop).getDate()+',  '+ new Date(pooop).getFullYear() +'</p></div>';
                //console.log(divele)
                dashboardboxcont.prepend(d);    
            }
        });
    });
    
    
})();