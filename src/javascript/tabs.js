
(function(){
    "use strict";

    var classList = require("../vendor/classList.js");
    classList.shim();

    exports.initialize = function initialize(options){
      
        checkOption(options.tabs,"options.tabs");
        checkOption(options.content,"options.content");
        checkOption(options.defaultTab,"options.default");
        checkOption(options.activeTabClass,"options.activeTabClass");
        checkOption(options.hiddenContentClass,"options.hiddenContentClass");

        var defaultTab = options.defaultTab;
        
        showTab(options.defaultTab, options);
        };

     function showTab(tabToShow, options){
        var activeIndex = findIndex(options.tabs, tabToShow);
        var contentToShow = options.content[activeIndex];
  
        options.content.forEach(function(element){
        element.classList.add(options.hiddenContentClass);

         });
        contentToShow.classList.remove(options.hiddenContentClass);
        tabToShow.classList.add(options.activeTabClass);
    }

    function findIndex(contentTab, defaultContentTab){
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