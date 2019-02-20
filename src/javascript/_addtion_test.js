(function(){
    "use strict";

    var addition = require("./addition.js");
    var assert = require("../vendor/chai-2.1.js").assert;

    describe("Addition",function(){
        it("add positive numberes", function(){
            assertEqual(addition.add(3,4),7);
        });
        it("uses IEEE 754 floating point",function(){
            assertEqual(addition.add(0.1,0.2),0.30000000000000004);
        });
        function assertEqual(actual, expected){
            if(actual!==expected) throw new Error("expected"+expected+",but was "+actual);
        }
    });

    function add (a, b){
        return a+b;
    }

}());