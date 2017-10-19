'use strict';

var doc = document,
    win = window,
    new_form = doc.getElementById("new_form"),
    inputcomp = new_form.children,
    //selectcomp = newcompany_form.getElementsByTagName("select"),
    //textareacomp = newcompany_form.getElementsByTagName('textarea'),
    compDescr = doc.getElementById('compDescr'),
    comp_creat_submit_bttn = doc.getElementById('create_comp_button'),
    compcrturl = "admin/compcreate/",
    compcreate_wrap = doc.getElementById('compcreate_wrap'),
    invstthispop = doc.getElementById('invstthispop'),
    invstnowwrap = doc.getElementById('invstnowwrap'),
    investoform = doc.getElementById('investoform'),
    investoforminputs = (investoform) ? investoform.children : '',
    baseinstinthiscompurl = "admin/invest/",
    invest_submit_bttn = doc.getElementById("invest_submit_bttn"),
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

var show_val = function (ele, thisval) {
    var dynamic_id = doc.getElementById("dynamic_id");
    ele.innerHTML = (thisval > 0) ? (dynamic_id.style.backgroundColor = "red", "<span style='margin:0px 2%; padding:0px;width:auto;clear:both;float:none;'>$" + doc.getElementById("invstincompAmount").value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "</span>" : (dynamic_id.style.backgroundColor = "");
};

var investinthiscomp = function (inputs, url, callbck) {
    //inputs = investoforminputs
    //url = baseinstinthiscompurl+invstnowwrap.getAttribute("data-thisob-id")
    //callbck = (e,res)=>{}
    var jsonnames = ["amount", "message"], sendvals = {}, errs = 0, p, n;
    
    for (p = 0; p < inputs.length; p++) {
        //console.log("tag name: "+ inputs[3].tagName);
        //console.log("loop start");
        if ((inputs[p].tagName === "textarea" || "TEXTAREA") || (inputs[p].tagName === "input" || "INPUT")) {
            //console.log("found tagnames" + inputs[p].tagName);
            if (inputs[p].value === 0 || inputs[p].value === "") {
                errs++;
                //console.log("error value = " + errs);
                //console.log(inputs[p].getAttribute("name") + " field is empty, please complete");
            } else {
                for (n = 0; n < jsonnames.length; n++) {
                    if (jsonnames[n] === inputs[p].getAttribute("name")) {
                        sendvals[jsonnames[n]] = inputs[p].value;
                        console.log(sendvals)
                    }
                }
            }
        }
    }
    if(errs == 0){
        //console.log(sendvals)
        postthisdata(url,callbck,sendvals);
    }else{
        console.log("Please complete all fields.")
    }
    
};

var creatnewcompprofile = function(inputcop,createurl, callback){
    var errcnt = 0, vals = {}, i;
    for(i=0;i<inputcop.length;i++){
        if(inputcop[i].getAttribute('class') != 'notincluded'){
            if(inputcop[i].getAttribute("type") != "range"){
                if(inputcop[i].value === "") {
                    errcnt++;
                    console.log(inputcop[i].tagName+'++++');
                }
            }else{
                if(inputcop[i].value == 0) {
                    errcnt++;
                    console.log(inputcop[i].tagName+'++++');
                }
            }
        }
    }
    
    console.log(errcnt);
    if(errcnt == 0){
        for(i=0;i<inputcop.length;i++){
            
            if(inputcop[i].getAttribute('class') != 'notincluded'){
                vals[inputcop[i].getAttribute('name')] = inputcop[i].value;
                inputcop[i].value = (inputcop[i].getAttribute("type")=="range")?0:'';
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
                    var amountpercent = parseFloat((findings.content[p].profile.raised/findings.content[p].profile.amount)*100)
                    
                    //console.log(findings.content[p]);
                    var pooop = parseInt(findings.content[p]._id.toString().substr(0,8), 16)*1000; 
                    var d = doc.createElement('div');
                    d.className = 'featured-investments-iconbox';
                    d.innerHTML = (findings.sessemail == findings.content[p].email)?'':'<div id="invstthispop'+findings.content[p]._id+'" class="pluss" title="Invest in this company!">'
                    +'<img id="invstincmp'+findings.content[p]._id+'" class="svggg" height="100%" src="/images/iibanc resources/icons/invsticon.svg"/></div>';
                    d.innerHTML +='<div class="featured-investments-logo"><img height="100%" src="images/iibanc resources/icons/ziggurat  watermark.svg"/></div><div class="featured-investments-iconinfo"><h4 style="margin:0px;">' + findings.content[p].profile.compname + '</h4><p style="margin:0px;">email: '+ findings.content[p].email + '<br/>bio: '+findings.content[p].profile.description + '</p><span>Seeking: $' + parseInt(findings.content[p].profile.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +' | Raised: $' + parseInt(findings.content[p].profile.raised).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</span></br><div style="height:6px;width:100%;margin: 3px auto;background-color:red;border-radius:3px;"><div style="height:100%;width:'+ amountpercent+'%;background-color:green;border-radius:3px;"></div></div><p style="font-size:9px;margin:0px auto;">Created: '+weekday[new Date(pooop).getDay()] +':- '+ Month[new Date(pooop).getMonth()] +', '+ new Date(pooop).getDate()+',  '+ new Date(pooop).getFullYear() +'</p></div>';
                    //console.log(divele)
                    d.setAttribute("data-thisob-id", findings.content[p]._id);
                    d.setAttribute("data-thisob-name", findings.content[p].profile.compname);
                    d.setAttribute("data-thisob-amount", findings.content[p].profile.amount);
                    d.setAttribute("data-thisob-raised", findings.content[p].profile.raised);
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

///////////////////////////////
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
            
            
            investoform.setAttribute("data-thisob-id",ev.target.parentElement.parentElement.getAttribute("data-thisob-id"));
            companynamespanele.innerHTML = " " + ev.target.parentElement.parentElement.getAttribute("data-thisob-name");
            
            var maxamnt = parseFloat(parseFloat(ev.target.parentElement.parentElement.getAttribute("data-thisob-amount")) - parseFloat(ev.target.parentElement.parentElement.getAttribute("data-thisob-raised")));
            
            invsamountforthscmp.innerHTML = maxamnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //invsamountforthscmp.innerHTML = ev.target.parentElement.parentElement.getAttribute("data-thisob-amount").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
            doc.getElementById("invstincompAmount").setAttribute("max", maxamnt);
            invstnowwrap.style.display ='block';
            
            
        }
        
        if(ev.target.getAttribute("id") == "bufferinvsclick"){
            //console.log("it clicked!");
            var thssurll = baseinstinthiscompurl + ev.target.parentElement.parentElement.getAttribute("data-thisob-id");
            //console.log(thssurll);
            investinthiscomp(investoforminputs,thssurll,(er,res)=>{
                if(er){
                    console.log(er);
                }else{
                    console.log(res.msg);
                }
            });
            
        }        
    });
    
    //CLOSE CREATE COMPANY MODAL WINDOW
    close_modal_windows([compny_create_close_popout,compny_create_popout],compcreate_wrap);
   
    ////////////////////////////////////
    
    //CLOSE CREATE COMPANY MODAL WINDOW-- USES FUNCTION close_modal_windows FROM global.js accessed via header
    close_modal_windows([invstnowwrapmodal_popout,close_investmodal],invstnowwrap);
    ////////////////////////////////////
    comp_creat_submit_bttn.addEventListener('click',(e)=>{
        
        creatnewcompprofile(inputcomp,compcrturl,(e,info)=>{
            if(e){
                console.log(e+info.msg);
                
            }else{
                //console.log(info);
                compcreate_wrap.style.display = 'none';
                //console.log(info);
                var pooop = parseInt(info.id.toString().substr(0,8), 16)*1000; 
                var d = doc.createElement('div');
                d.className = 'featured-investments-iconbox';
                d.innerHTML = '<div class="featured-investments-logo"><img height="100%" src="images/iibanc resources/icons/ziggurat  watermark.svg"/></div><div class="featured-investments-iconinfo"><h4 style="margin:0px;">' + info.comp.profile.compname+ '</h4><p style="margin:0px;">email: ' + info.comp.email+ '<br/>bio:' + info.comp.profile.description + '</p><p style="font-size:9px;">Created: '+ weekday[new Date(pooop).getDay()] +':- '+ Month[new Date(pooop).getMonth()] +', '+ new Date(pooop).getDate()+',  '+ new Date(pooop).getFullYear() +'</p></div>';
                //console.log(divele)
                dashboardboxcont.prepend(d);    
            }
        });
    });

})();