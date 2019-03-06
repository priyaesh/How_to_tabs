
(function(){
    "use strict";

    var classList = require("../vendor/classList.js");
    classList.shim();

    exports.initialize = function initialize(options){
        var tabs = options.tabs;
        var content = options.content;
        
        var defaultTab = options.default;
        var contentHideClass = options.contentHideClass;
        var activeTabClass = options.activeTabClass;
    

        checkOption(tabs,"options.tabs");
        checkOption(content,"options.content");
        checkOption(defaultTab,"options.default");
        checkOption(activeTabClass,"options.activeTabClass");
        checkOption(contentHideClass,"options.contentHideClass");

        var activeIndex = findIndexOfDefaultElement(tabs, defaultTab);
         var defaultContent = content[activeIndex];
      
        content.forEach(function(element){
            element.classList.add(contentHideClass);

        });
        defaultContent.classList.remove(contentHideClass);
        defaultTab.classList.add(activeTabClass);
    };

    function findIndexOfDefaultElement(contentTab, defaultContentTab){
        for(var i=0;i < contentTab.length; i++){
            if(contentTab[i] === defaultContentTab)
            return i;
        }
        throw new Error ("Could not be find default in list");
    }
    function checkOption(option, name){
        if(option === undefined) throw new Error ("Expected "+name);
    }
}());