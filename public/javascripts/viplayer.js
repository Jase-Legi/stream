'use strict';
var doc = document, win = window,
contnr = doc.getElementById('ctrlcnt'),
playbtn = doc.getElementById('playbttn'),
playimg = doc.getElementById('playpause'),
vidplyr = doc.getElementById('coolvid'),
vidbx = doc.getElementById('vidbox'),
vidctrl = doc.getElementById('vidCtrl'),
prgress = doc.getElementById('prgress'),
prgw = doc.getElementById('progwrpp'),
prgbr = doc.getElementById('progress'),
optnwrp = doc.getElementById('optnwrp'),
volbttn = doc.getElementById('volbttn'),
volimg = doc.getElementById('volimg'),
volbr = doc.getElementById('voladj'),
volseek = doc.getElementById('volprg'),
fullscrn = doc.getElementById('fullscreen'),
fulscrncnt = doc.getElementById('fullscrn'),
trktme = doc.getElementById('currtme'),
pttme = doc.getElementById('cchldtme'),
nval = doc.createTextNode(""),
pltfrm = navigator.userAgent.toString(),
//ndetest = doc.getElementById('nodetest'),
hidevol,
timemouse, mousevis, updwn, dragprg, offfset,frctnld, 
frctn, durtn, curr, diff, rto, cw, plw, optw,
num1, num11, num2, num22, srcbtn;
//var vidsrc = '../Videos/Tommy Lee Sparta - Numb - Official Music Video.mp4',
var fllder = "videos/",
vidsrc = fllder+"Lil Uzi Vert - Do What I Want [Official Music Video].mp4",
vName = vidsrc.replace(/^.*(\\|\/|\:)/, ''),
vtype = vName.substr((vName.lastIndexOf('.') + 1)),
lghtbx = doc.getElementById('lightbx');

(function() {
    // your page initialization code here
                
    (pltfrm.match(/Android|Blackberry|iPhone|iPod|Opera Mini|IEMobile/i))?(
    //for(var i in navigator){
        alert(pltfrm+'<br>hihihi')
    //}
    ):"desktop";
    //document.onreadystatechange = function () {
    //if (document.readyState == "complete") {
    //document is ready. Do your stuff here
    //document.write(phpop);

    (vtype === "mp4" || "ogv" || "webm" || "MP4" || "OGV" || "WEBM")?(
        srcbtn = doc.createElement("source"),
        srcbtn.setAttribute("src", vidsrc),
        srcbtn.setAttribute("type", "video/"+vtype/*+"; codecs=avc1.42E01E,mp4a.40.2"*/),
        vidplyr.appendChild(srcbtn),
        pttme.appendChild(nval),
        
        vidplyr.addEventListener('loadedmetadata', function() {
            durtn = vidplyr.duration;
        })
    ):"";  
                
                //////////////////////////
                //alert(decodeURIComponent('%26'));
                //alert(encodeURI('%2C'));
                //var qury = location.search.substring(1);
                //doc.write(qury+"---- ");
                /////////////////////////////
                
    function edctrl(vidt){
       vidt.controls = false;
    }
    edctrl(vidplyr);
    
    function resz(){
        cw = vidctrl.offsetWidth;
        optw = optnwrp.offsetWidth;
        plw = playbtn.offsetWidth;
        diff = (cw - (plw+optw+25));
        rto = ((diff/cw)*100);
        prgw.style.width =  ((diff/cw)*100)+"%" ;
    }
    resz();

    win.addEventListener('resize', resz,false);
    
    function playpause(){
        (!vidplyr.paused)?(
            vidplyr.pause(),
            //vidplyr.paused == true;
            playbtn.title = 'Play',
            playimg.src = 'images/playbutton.png'
        ):(
            (((vidplyr.paused) && (vidplyr.ended))?(
                vidplyr.currentTime = 0,
                vidplyr.play(),
                playbtn.title = 'Pause',
                playimg.src = 'images/pausebutton.png'
            ):("")),
            vidplyr.play(),
            playbtn.title = 'Pause',
            playimg.src = 'images/pausebutton.png'
        );
    }

    function retnum(num){
        num1 = parseInt(num/60); 
        num2 = parseInt(num%60);
        (num1<10)?( num11 ="0"+num1.toString() ):( num11 = num1.toString());
        (num2<10)?( num22 = "0"+num2.toString() ):( num22 = num2.toString());
        return num11+":"+num22;
    }
    
    function updtseekb(){  
        curr = vidplyr.currentTime || "";
        var thtwidth = (curr/durtn) *100;
        prgress.style.width = (thtwidth+'%');
        var crrtme = parseInt(vidplyr.currentTime);
        nval.nodeValue = retnum(crrtme);
    }
    
    function seekchnge(e){
        dragprg = doc.getElementsByClassName('dragprg');
        //offfset = dragprg.offset();
        frctn = parseFloat((((e.pageX)-1)-((dragprg[0].getBoundingClientRect().left)+(win.pageXOffset)+(dragprg[0].clientLeft)))/(dragprg[0].clientWidth));
        vidplyr.currentTime = parseFloat(frctn*durtn);
        updtseekb();
        function rsme(){
            vidplyr.play();
            playbtn.title = 'Pause';
            playimg.src = 'images/pausebutton.png';
        }
        //if vidplyr is paused then execute the function rsme
        !vidplyr.playing ? rsme():"";
    }
    
    function volctrl(){
        (vidplyr.muted) ? (
            vidplyr.muted = false, volbr.title = 'Click to mute', volimg.src = 'images/volbttn.png')
        :
        (vidplyr.muted = true, volbr.title = 'Click to unmute', volimg.src = 'images/volbttn2.png')
        ;
    }

    /*function testobj(){
    var th = this;
    th.nd = ndetest;
    th.nv = nval;
    th.inf = " hello world";
    //p = th.inf;
    th.fun = function(p){
    th.nd.appendChild(th.nv);
    th.nv.nodeValue += p;
    };
    }*/
    //******************FIX
                
    function showvolbr(){

        var h=0;
        function frme(){
            h++;
            var volheight;
            volbr.style.display = 'block';
            volseek.style.display = '';
            volbr.style.height = (h)+"px";
            (h === 50 )?(
                h=0,
                volheight = parseFloat(parseFloat(vidplyr.volume)*(volbr.clientHeight)), 
                volseek.style.height = volheight+"px",
                clearInterval(ddd),
                clearInterval(hidevol)
            ):"";
            
        }
        var ddd = setInterval(frme, 0.5);
    }
    
    function hidevolbr(){
        volbr.style.display = 'none'; 
        volseek.style.display = 'none';
    }
    
    
    //this function adds multiple event listeners to one element and applies their handler function
    function addmltpllstnr(ele, events, hndlr, usecptr,args){
        if(!(events instanceof Array)){
            console.log("");
        }
        var hndlrfn = function(e){
            hndlr.apply(this, args && args instanceof Array? args : []);
        }
        for(var v= 0, eve; eve= events[v]; v++ ){
            ele.addEventListener(eve, hndlrfn, usecptr);
            console.log(eve);
        }
    }    
    
    volimg.addEventListener('mouseover', function(){
        
        clearInterval(hidevol);
        showvolbr();
        

    }, false);
    
            volbr.addEventListener('mouseout', function(){
            //clearInterval(hidevol);
            hidevol = setInterval(hidevolbr, 3000);
            
            //hidevolbr();
        }, false);
    
    function chngvol(e){
        
        var dragvol = doc.getElementsByClassName('dragvol');
        /////////////////////jQuery version below/////////////////////
        //var frctnld = parseFloat(1-(((e.pageY)-($('.dragvol').offset().top))/($('.dragvol').innerHeight())));
        
        frctnld = parseFloat(1-(((e.pageY)- ((dragvol[0].getBoundingClientRect().top)+ ((win.pageYOffset)+dragvol[0].clientTop)))/(dragvol[0].clientHeight)));
        
        var vbh = parseFloat(volbr.style.height);
        
        (vidplyr.muted)?(
            vidplyr.volume = frctnld,
            volseek.style.height =(vbh*frctnld)+"px", 
            vidplyr.muted = false,
            volimg.src = 'images/volbttn.png'
        ):(
            (frctnld>1)?(
                frctnld = 1,
                vidplyr.volume = frctnld,
                volseek.style.height = (vbh*frctnld)+"px"
            ):(
                (frctnld<0)?(
                    frctnld = 0,
                    vidplyr.volume = frctnld,
                    volseek.style.height = (vbh*frctnld)+"px"
                ):(
                    //frctnld = 1;
                    vidplyr.volume = frctnld,
                    volseek.style.height = (vbh*frctnld)+"px"
                    
                )
                
            )
        );
    }
    
    volbttn.addEventListener('mousedown', function(e){
        function inivolseek(e){
            chngvol(e);
        }
        volbr.classList.add('dragvol');
        inivolseek(e);
        win.addEventListener('mousemove', function(e){
            volbr.style.display = 'block';
            volseek.style.display = '';

            inivolseek(e);
        },false);
        
        win.addEventListener('mouseup', function(){
            volbr.classList.remove('dragvol');
            inivolseek = function(){ return false; };
        }, false);
    }, false);
    
    volimg.addEventListener('click', volctrl,false);
    
    function notfllscrn(){
        fullscrn.title = 'Enter fullscreen';
        fullscrn.src = 'images/fullscreen.png';
    }
    
    function isfllscrn(){
        fullscrn.title = 'Exit fullscreen';
        fullscrn.src = 'images/fullscreen2.png';
    }   
        
    function vidfullscrn(vfr){
        //isfllscrn();
        (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement )?

            (vfr.requestFullscreen)?(
            vfr.requestFullscreen()
        ):(
            (vfr.mozRequestFullScreen)? (
                vfr.mozRequestFullScreen() // Firefox
            ):(
                (vfr.webkitRequestFullScreen)? (
                    vfr.webkitRequestFullScreen() // Chrome and Safari
                ):(
                    (vfr.msRequestFullscreen)?(
                                    isfllscrn(),
                        vfr.msRequestFullscreen() // IE
                    ):("")
                )
            )
        ) :(
            
                        //notfllscrn(),
            (doc.exitFullscreen)?(
                doc.exitFullscreen()
            ):( 
                (doc.mozCancelFullScreen)? (
                    doc.mozCancelFullScreen()
                ):( 
                    (doc.webkitExitFullscreen)? (
                        doc.webkitExitFullscreen()
                    ):( 
                        (doc.msExitFullscreen)? (
                            notfllscrn(),
                            doc.msExitFullscreen()
                        ):("")
                    )
                )
            )

        );
    }
    
    
    function checkfullscrn(e){
        (doc.fullscreen || doc.mozFullScreen || doc.webkitFullscreen || doc.msFullscreen)? isfllscrn() : notfllscrn();
    }
    addmltpllstnr(doc,['fullscreenchange','mozfullscreenchange', 'webkitfullscreenchange','MSFullscreenChange'], checkfullscrn, false);
        
    function ctrlbarup(){
        updwn = true;
        vidCtrl.style.display = 'block'; 
        resz();
    }
    
    function ctrlbardwn(){
        updwn = false;
        vidCtrl.style.display = 'none'; 
    }
    
    function cursorInvis() {
        mousevis = false;
        contnr.style.cursor ="none";
    }

    function hidemse(){
        cursorInvis();
        ctrlbardwn();
    }
    
    
    vidbx.addEventListener('mouseenter', function(){
        ctrlbarup();
        //this.addEventListener('mouseleave', function(){
            //ctrlbardwn(); 
        //}, false);
    }, false);
    
    contnr.addEventListener('mousemove', function(e){
        
        //e.preventDefault;
        (!mousevis && !updwn)?((
            ctrlbarup(),
            mousevis = true) ,
            contnr.style.cursor = "default"
        ):(
        clearInterval(timemouse),
        timemouse = setInterval(function(){hidemse();} , 3000));
    }, false);

    vidplyr.addEventListener('timeupdate', updtseekb, false);

    
    
    
    
    
    
    
    
    prgw.addEventListener('mousedown', function (e) {
        function iniseek(e) {
            seekchnge(e);
        };
        console.log(e.pointerType);

        this.classList.add('dragprg');
        iniseek(e);
        win.addEventListener('mousemove', function (e) {
            iniseek(e);
        }, false);
        win.addEventListener('mouseup', function () {
            prgw.classList.remove('dragprg');
            iniseek = function () { ""; };
        }, false);
    }, false);

    
    
    
    
    
    
    
    
    
    
    fullscrn.addEventListener('click', function (cfr){cfr = contnr;vidfullscrn(cfr);}, false);

    vidCtrl.addEventListener('mousemove', function(e){ e.preventDefault;contnr.style.cursor = "default"; this.style.display = "block";});
    
    /*vidbx.addEventListener('click', function(){
        (!mousevis && !updwn)?((
            ctrlbarup(),
            mousevis = true) ,
            contnr.style.cursor = "default"
        ):"";
        //clearInterval(timemouse);
        //timemouse = setInterval(function(){hidemse();});
    },false);*/
    
    playbtn.addEventListener('click', playpause, false);

    function eek(e){
        (!mousevis && !updwn)?((
            ctrlbarup(),
            mousevis = true) ,
            contnr.style.cursor = "default"
        ):"";
        //clearInterval(timemouse);
        //timemouse = setInterval(function(){hidemse();});
    }
    
    addmltpllstnr(vidbx, ['click', 'touchstart'], eek, false);
    
    
})();  