
(function(){
    "use strict";

    var classList = require("../vendor/classList.js");
    classList.shim();

    exports.initialize = function initialize(options){
        var tabs = options.tabs;
        var content = options.content;
        
        var defaultElement = options.default;
        var contentHideClass = options.contentHideClass;
        var activeTabClass = options.activeTabClass;
    
        if(tabs === undefined) throw new Error("Expected options.tab");
        if(activeTabClass === undefined) throw new Error("Expected options.activeTabClass");
        if(content === undefined) throw new Error("Expected options.content");
        if(defaultElement === undefined) throw new Error("Expected options.defaultElement");
        if(contentHideClass === undefined) throw new Error ("Expected option.contentHideClass");

        content.forEach(function(element){
            element.classList.add(contentHideClass);

        });
        defaultElement.classList.remove(contentHideClass);

       if(tabs !== undefined) tabs[0].classList.add(activeTabClass);
    };
}());