
(function(){
    "use strict";

    var classList = require("../vendor/classList.js");
    classList.shim();

    exports.initialize = function initialize(options){
        var elementList = options.content;
        var defaultElement = options.default;
        var className = options.contentHideClass;

        if(elementList === undefined) throw new Error("Expected options.content");
        if(defaultElement === undefined) throw new Error("Expected options.defaultElement");
        if(className === undefined) throw new Error ("Expected option.contentHideClass");
        elementList.forEach(function(element){
            element.classList.add(className);

        });
        defaultElement.classList.remove(className);
    };
}());