(function(){
    "use strict";

    
    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    
    describe("Tabs",function(){
        var container;
        beforeEach(function(){
            container = document.createElement("div");
            document.body.appendChild(container);
            
        });
    
        afterEach(function(){
            removeElement(container);
        });
    
        it("hides an element by setting the class", function(){
            
            var element = addElement("div");           

            tabs.initialize([element],"someClass");

            assert.equal(getClasses(element),"someClass");

          
        });
        it("hide multiple elements", function(){
            var element1 = addElement("div");
            var element2 = addElement("div");
            var element3 = addElement("div");

            tabs.initialize([element1,element2,element3],"hideClass");

            assert.equal(getClasses(element1), "hideClass","element1");
            assert.equal(getClasses(element2), "hideClass","element2");
             assert.equal(getClasses(element3), "hideClass","element3");
            

        });
        

        it("preserve existing class when hideing  an element ", function(){
            var element = addElement("div");
            element.setAttribute("class","existingClass");

            tabs.initialize([element],"newClass");

            assert.equal(getClasses(element), "existingClass newClass");

            
        });

        
        
       function addElement(tagName){
           var element = document.createElement(tagName);
           container.appendChild(element);
           return element;

       }

       function getClasses(element){
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