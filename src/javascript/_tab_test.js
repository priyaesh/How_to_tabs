(function(){
    "use strict";

    
    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    
    describe("Tabs",function(){
        var container;
        var ACTIVE_TAB ="activeClass";
        var IRRELEVANT = "irrelvent";
        var HIDDEN_CONTENT = "hideClass";
        beforeEach(function(){
            container = document.createElement("div");
            document.body.appendChild(container);
            
        });
    
        afterEach(function(){
            removeElement(container);
        });
    
        
        it("use a class to hide all content elements except the defaultTab upon initialization", function(){
            var defaultTab = createTab();

              var content1 = createTabContent();
            var defaultContent = createTabContent();
            var content3 = createTabContent();
            tabs.initialize({
                tabs: [createTab(),defaultTab, createTab()],
                content:[content1,defaultContent,content3],
                defaultTab: defaultTab,
                activeTabClass: IRRELEVANT,
                hiddenContentClass: HIDDEN_CONTENT

            });
                

            assertContentHidden(content1, "element1 should be hidden");
            assertContentVisible(defaultContent,"default element should not be hidden");
          //  assert.equal(getClasses(defaultContent), "","defaultTabContent should not be hidden");
            assertContentHidden(content3, "element3 should be hidden");
        });

        
        it("switches content when tab is clicked", function(){
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
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: HIDDEN_CONTENT
            });

            tab2.click();
            assertContentVisible(content2, "content 2 should be visible after click");
            assertTabActive(tab2, "tab2 should be visible click");

            assertContentHidden(content1, "content1 should no longer be visible after click ");
             assertTabInactive(tab1, "tab1 should not be visible visible ");

            tab3.click();
            assertContentVisible(content3, "should be able to click multiple tabs");
           
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
                activeTabClass:ACTIVE_TAB,
                hiddenContentClass:IRRELEVANT
            });
            assertTabInactive(tab1, "tab 1 should be hidden");
             assertTabActive(defaultTab, "defaultTab should not be hidden") ;
            assertTabInactive(tab3, "tab3 should be hidden");

          
            
        });

        it("preserve existing classes on the active tab",function(){

        });

        function assertTabActive(element, message){
            assert.equal(getClasses(element), ACTIVE_TAB);

        }
        function assertTabInactive(element, message ){
               assert.equal(getClasses(element), "", message +" should not be styled");
        }
        
        function assertContentHidden(element, message){
            assert.equal(getClasses(element), HIDDEN_CONTENT, message +"should be hidden");
        }

        function assertContentVisible(element, message){
            assert.equal(getClasses(element), "", message +"should not be hidden");
      
        }
        
       function addElement(tagName){
           var element = document.createElement(tagName);
           container.appendChild(element);
           return element;

       }

       function getClasses(element){
           var result = element.getAttribute("class");
           if(result === null) result = "";
           return result;
    
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