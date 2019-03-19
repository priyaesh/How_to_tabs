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
        assertContentHidden(content3, "element3 should be hidden");
        });
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