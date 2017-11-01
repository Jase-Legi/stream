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
    
}());