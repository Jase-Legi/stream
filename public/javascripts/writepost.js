var doc = document;
var win = window;
var writetextarea = doc.getElementById("writeboxtextarea");

var auto_grow = function (elment) {
    "use strict";
    //var s_height = elment.scrollHeight;
    elment.style.height = (elment.scrollHeight) + "px";
};

(function () {
    "use strict";
    //auto_grow(writetextarea);
    
    writetextarea.addEventListener("focus", ()=> {
        writetextarea.style.minHeight = "125px";
        writetextarea.style.height = "auto";
        //writetextarea.style.overflow = 'auto';
    });
    
    writetextarea.addEventListener("focusout", ()=> {
        writetextarea.style.minHeight = "50px";
        writetextarea.style.height = "50px";
        writetextarea.style.overflow = "hidden";
    });
}());