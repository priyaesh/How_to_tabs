(function(){
    "use strict";

    
    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    describe("Tabs",function(){
        it("Sets a class on an element when that element has no existing classes ", function(){
            
            var element = addElement("div");           

            tabs.initialize(element,"someClass");

            assert.equal(getClass(element),"someClass");

           // assert.equal(getDisplayValue(element),"none");

            removeElement(element);
           
        });

        it("sets a class on an element without erasing existing class", function(){
            var element = addElement("div");
            element.setAttribute("class","existingClass");

            tabs.initialize(element,"newClass");

            assert.equal(getClass(element), "existingClass newClass");

            removeElement(element);
        });
        
        
       function addElement(tagName){
           var element = document.createElement(tagName);
           document.body.appendChild(element);
           return element;

       }

       function getClass(element){
           return element.getAttribute("class");
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