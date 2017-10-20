'use strict';
var doc = document,
    win = window,
    legiopenees = [doc.getElementById("legibio"), doc.getElementById("popoutbio")],
    pierreopenees = [doc.getElementById("Pierrebio"), doc.getElementById("popoutbio")],
    Legibox = [doc.getElementById("Legibox"), doc.getElementById("pierrebox")];

/*var showfounderbios = function (openers, openees){
    
    if(Array.isArray(openers)){
        for(var v=0; v < openers.length; v++){
            if( Array.isArray(openees) ){
                for(var b =0; b<openees.length;b++){
                    openers[v].addEventListener("click", function(){
                        openees[b].style.display = "block";
                    });
                }
            }
        }
    }
};*/

(function() {
    Legibox[0].addEventListener("click",function(){
        legiopenees[0].style.display = "block";
        legiopenees[1].style.display = "block";
    });
    
    Legibox[1].addEventListener("click",function(){
        pierreopenees[0].style.display = "block";
        pierreopenees[1].style.display = "block";
    });
    
    legiopenees[1].addEventListener("click",function(){
        //(legiopenees[0])? this.style.display = "none":"";
        (legiopenees[1])?(legiopenees[0].style.display = "none", this.style.display = "none"):"";
    });
    
    pierreopenees[1].addEventListener("click",function(){
        (pierreopenees[0])? (pierreopenees[0].style.display = "block", this.style.display = "none"):"";
        //(pierreopenees[1])? pierreopenees[1].style.display = "block":"";
    });
})();