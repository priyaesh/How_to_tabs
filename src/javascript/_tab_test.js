(function(){
    "use strict";

    
    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    describe("Tabs",function(){
        it("Hide an element", function(){
            //create element
            var element = document.createElement("div");
            //act
            tabs.initialize(element);

            //assert 
             var styles = getComputedStyle(element);
             var display = styles.getPropertyValue(display);

             assert.equal(display,"none");
            
            // div.innerHTML = "This is my div ";
            // document.body.appendChild(div);
            // var p = document.createElement("p");
            // p.innerHTML = "This is embedded in paragraph";
            // div.appendChild(p);

            // div.parentNode.removeChild(div);
        });
       
    });

   
}());