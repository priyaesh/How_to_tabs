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
                defaultTab: defaultTab,
                activeTabClass: IRRELEVANT,
                hiddenContentClass: "hideClass"

            });
                

            assert.equal(getClasses(content1), "hideClass","content1 should be hidden");
            assert.equal(getClasses(defaultContent), "","defaultTabContent should not be hidden");
             assert.equal(getClasses(content3), "hideClass","content3 should be hidden");
            

        });
        
        it("switch content when tab is clicked", function(){
            var tab1 = createTab();
            var tab2 = createTab();
            var tab3 = createTab();

            var content1 = createTabContent();
            var content2 = createTabContent();
            var content3 = createTabContent();

            tabs.initialize({
                tabs: [tab1, tab2, tab3],
                content: [content1, content2, content3],
                defaultTab: tab1,
                activeTabClass: "activeTab",
                hiddenContentClass: "hiddenContent"
            });

            //click tab2
            //assert content2 is visible
            //assert content1 is no longer visible

            //assert tab2 is active
            //assert tab1 is no longer active
        });

        it("preserve existing class when adding a new classes upon initialization ", function(){
            var defaultTab = createTab();
            defaultTab.setAttribute("class","existingTabClass");

            var defaultContent = createTabContent();
            var hiddenContent = createTabContent();
            hiddenContent.setAttribute("class","existingContentClass");

            tabs.initialize({
                tabs: [defaultTab,createTab()],
                content:[defaultContent, hiddenContent],
                defaultTab:defaultTab,
                activeTabClass: "activeTab",
                hiddenContentClass:"hiddenContent"

            });
            assert.equal(getClasses(defaultTab),"existingTabClass activeTab", "tab should preserve existing classes");
                

            assert.equal(getClasses(hiddenContent), "existingContentClass hiddenContent","content should preserve existing classes");

            
        });
        it("styles the defaultTab tab with a class", function(){
            var tab1 = createTab();
            var defaultTab = createTab();
            var tab3 = createTab();

            var defaultContent = createTabContent();

            tabs.initialize({
                tabs:[tab1,defaultTab,tab3],
                content:[createTabContent(),defaultContent,createTabContent()],
                defaultTab:defaultTab,
                activeTabClass:"activeTab",
                hiddenContentClass:"ignored"
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