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
    
        
        it("hide all content elements except the defaultTab upon initialization", function(){
            var defaultTab = createTab();

              var content1 = createTabContent();
            var defaultContent = createTabContent();
            var content3 = createTabContent();
            tabs.initialize({
                tabs: [createTab(),defaultTab, createTab()],
                content:[content1,defaultContent,content3],
                default: defaultTab,
                activeTabClass: IRRELEVANT,
                contentHideClass: "hideClass"

            });
                

            assert.equal(getClasses(content1), "hideClass","content1 should be hidden");
            assert.equal(getClasses(defaultContent), "","defaultTabContent should not be hidden");
             assert.equal(getClasses(content3), "hideClass","content3 should be hidden");
            

        });
        

        it("preserve existing class when hiding a content element ", function(){
            var defaultTab = createTab();

            var defaultContent = createTabContent();
            var hiddenContent = createTabContent();
            hiddenContent.setAttribute("class","existingClass");

            tabs.initialize({
                tabs: [defaultTab,createTab()],
                content:[defaultContent, hiddenContent],
                default:defaultTab,
                activeTabClass: "activeTab",
                contentHideClass:"newClass"

            });
                

            assert.equal(getClasses(hiddenContent), "existingClass newClass");

            
        });
        it("styles the defaultTab tab with a class", function(){
            var tab1 = createTab();
            var defaultTab = createTab();
            var tab3 = createTab();

            var defaultContent = createTabContent();

            tabs.initialize({
                tabs:[tab1,defaultTab,tab3],
                content:[createTabContent(),defaultContent,createTabContent()],
                default:defaultTab,
                activeTabClass:"activeTab",
                contentHideClass:"ignored"
            });
            assert.equal(getClasses(tab1), null,"tab1 should not be styled");
            assert.equal(getClasses(defaultContent), "","defaultTabContent should  be styled");
             assert.equal(getClasses(tab3), null,"tab3 should not be styled");
            

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