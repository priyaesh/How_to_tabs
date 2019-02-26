(function(){
    "use strict";

    
    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    describe("Tabs",function(){
        it("Hide an element", function(){
            
            var element = addElement("div");           

            tabs.initialize(element);

            assert.equal(getDisplayValue(element),"none");

            removeElement(element);
           
        });
       function addElement(tagName){
           var element = document.createElement(tagName);
           document.body.appendChild(element);
           return element;

       }

       function getDisplayValue(element){
        var styles = getComputedStyle(element);
        return  styles.getPropertyValue("display");
     
       }

       function removeElement(element){
        element.parentNode.removeChild(element);
       }

    });

   
}());