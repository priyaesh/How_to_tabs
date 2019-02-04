(function () {
    "use strict";

    var EXPECTED_NODE_VERSION = "v10.14.1"
    console.log("\n \n BUILD OK");

    desc("Default build");
    task("default" ,["version"],function () {
        console.log("Hello i am default task");
    });

    desc("check node version");
    task("version",function () {
        console.log("Checking node version: .");
        var actualVersion = process.version;
        if(actualVersion!==EXPECTED_NODE_VERSION){
            fail("Incorrect node version : Expected"+EXPECTED_NODE_VERSION +"but was actual"+actualVersion)
        }
    });
}());