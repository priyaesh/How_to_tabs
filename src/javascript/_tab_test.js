(function(){
    "use strict";

    
    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    
    describe("Tabs",function(){
        var container;

        var IRRELEVANT = "irrelvent";
        beforeEach(function(){
            container = document.createElement("div");
            document.body.appendChild(container);
            
        });
    
        afterEach(function(){
            removeElement(container);
        });
    
        
        it("hide all content elements except the default upon initialization", function(){
              var element1 = createTabContent();
            var defaultElement = createTabContent();
            var element3 = createTabContent();
            tabs.initialize({
                tabs: [createTab(), createTab(), createTab()],
                content:[element1,defaultElement,element3],
                default:defaultElement,
                activeTabClass:IRRELEVANT,
                contentHideClass:"hideClass"

            });
                

            assert.equal(getClasses(element1), "hideClass","element1 should be hidden");
            assert.equal(getClasses(defaultElement), "","defaultElement should not be hidden");
             assert.equal(getClasses(element3), "hideClass","element3 should be hidden");
            

        });
        

        it("preserve existing class when hiding a content element ", function(){
           
            var defaultElement = createTabContent();
            var hiddenElement = createTabContent();
            hiddenElement.setAttribute("class","existingClass");

            tabs.initialize({
                tabs: [createTab(),createTab()],
                content:[defaultElement, hiddenElement],
                default:defaultElement,
                activeTabClass: "activeTab",
                contentHideClass:"newClass"

            });
                

            assert.equal(getClasses(hiddenElement), "existingClass newClass");

            
        });
        it("styles the default tab with a class", function(){
            var defaultTab = createTab();
            var defaultElement = createTabContent();

            tabs.initialize({
                tabs:[defaultTab],
                content:[defaultElement],
                default:defaultElement,
                activeTabClass:"activeTab",
                contentHideClass:"ignored"
            });
            assert.equal(getClasses(defaultTab),"activeTab");
        });
        it("preserve existing classes on the active tab",function(){

        });

        
        
       function addElement(tagName){
           var element = document.createElement(tagName);
           container.appendChild(element);
           return element;

       }

       function getClasses(element){
           return element.getAttribute("class");
    
       }

       function createTab(){
           var tab = addElement("div");
           tab.innerHTML = "tab";
           return tab;
       }
       function createTabContent(){
        var tab = addElement("div");
        tab.innerHTML = "content";
        return tab;
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