'use strict';

var doc = document,
    win = window,
    new_form = doc.getElementById('new_form'),
    inputcomp = new_form.children,
    selectcomp = newcompany_form.getElementsByTagName('select'),
    textareacomp = newcompany_form.getElementsByTagName('textarea'),
    compDescr = doc.getElementById('compDescr'),
    comp_creat_submit_bttn = doc.getElementById('create_comp_button'),
    compcrturl = 'admin/compcreate/',
    compcreate_wrap = doc.getElementById('compcreate_wrap'),
    dwrraap = doc.getElementById('dwrraap'),
    comp_prof_urls = 'admin/getothercomps/',
    compny_create_close_popout = doc.getElementById('compny_create_close_popout'),
    dashboardboxcont = doc.getElementById('dashboardboxcont'),
    weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    compny_create_popout = doc.getElementById('compny_create_popout');
    
        
var creatnewcompprofile = function(createurl, callback){
    var errcnt = 0;
    var vals = {};
    for(var i=0;i<inputcomp.length;i++){
        if(inputcomp[i].getAttribute('class') != 'notincluded'){
            if(inputcomp[i].value == '' || inputcomp[i].value == 0) {
                errcnt ++;
                console.log(inputcomp[i].tagName+'++++');
            }
        }
    }
    
    console.log(errcnt);
    if(errcnt == 0){
        for(var i=0;i<inputcomp.length;i++){
            
            if(inputcomp[i].getAttribute('class') != 'notincluded'){
                vals[inputcomp[i].getAttribute('name')] = inputcomp[i].value;
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
                    d.innerHTML = '<div class="featured-investments-logo"><img height="100%" src="images/Legiframework.png"/></div><div class="featured-investments-iconinfo"><h4>'+findings.content[p].profile.fundraiser.compname+'</h4><p>email: '+ findings.content[p].email+'<br/>bio: '+findings.content[p].profile.fundraiser.description+' | </p><p style="font-size:9px;">Created: '+weekday[new Date(pooop).getDay()] +':- '+ Month[new Date(pooop).getMonth()] +', '+ new Date(pooop).getDate()+',  '+ new Date(pooop).getFullYear() +'</p>';
                    //console.log(divele)
                    divele.appendChild(d);
                    
                }
            }
        }
    });
    
};

(function() {
//doc.addEventListener("DOMContentLoaded",function(event){
    
    dispcompprofiles(comp_prof_urls,dashboardboxcont);
    
    dwrraap.addEventListener('click',()=>{
        compcreate_wrap.style.display ='block';
    });
    
    compny_create_close_popout.addEventListener('click',()=>{
        compcreate_wrap.style.display ='none';
    });
    
    compny_create_close_popout.addEventListener('mouseover',()=>{
        compny_create_close_popout.style.backgroundColor = 'red';
    });
    
    compny_create_close_popout.addEventListener('mouseout',()=>{
        compny_create_close_popout.style.backgroundColor ='#222222';
    });

    compny_create_popout.addEventListener('click',()=>{
        compcreate_wrap.style.display ='none';
    });
    
    comp_creat_submit_bttn.addEventListener('click',()=>{
        
        creatnewcompprofile(compcrturl,(e,info)=>{
            if(e){
                console.log(e+info.msg);
                
            }else{
                console.log(info);
                compcreate_wrap.style.display = 'none';
                
                
                    console.log(info);
                    var pooop = parseInt(info.id.toString().substr(0,8), 16)*1000; 
                    var d = doc.createElement('div');
                    d.className = 'featured-investments-iconbox';
                    d.innerHTML = '<div class="featured-investments-logo"><img height="100%" src="images/Legiframework.png"/></div><div class="featured-investments-iconinfo"><h4>'+info.comp.profile.fundraiser.compname+'</h4><p>email: '+ info.comp.email+'<br/>bio: '+info.comp.profile.fundraiser.description+' | </p><p style="font-size:9px;">Created: '+weekday[new Date(pooop).getDay()] +':- '+ Month[new Date(pooop).getMonth()] +', '+ new Date(pooop).getDate()+',  '+ new Date(pooop).getFullYear() +'</p>';
                    //console.log(divele)
                    dashboardboxcont.prepend(d);
                
                
                
            }
        });
    });
    
    
})();