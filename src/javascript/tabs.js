
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

        //var defaultTab = options.defaultTab;
        handleClicks(options);
        showTab(options.defaultTab, options);
        
    };
        
    function handleClicks(options){
        //console.log("tabElement"+tabElement);
        options.tabs.forEach(function(tabElement){
             tabElement.addEventListener("click",function(event){
                showTab(tabElement, options);
            });
        });

    }

    function showTab(tabToShow, options){
        var activeIndex = findIndex(options.tabs, tabToShow);
        var contentToShow = options.content[activeIndex];

        options.tabs.forEach(function(element){
            element.classList.remove(options.activeTabClass);
        });
        tabToShow.classList.add(options.activeTabClass);

        options.content.forEach(function(element){
            element.classList.add(options.hiddenContentClass);
        });
        contentToShow.classList.remove(options.hiddenContentClass);
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