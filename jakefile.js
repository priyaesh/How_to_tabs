(function () {
    "use strict";

    desc("Default build");
    task("default" ,["version"],function () {
        console.log("\n \n BUILD OK");
    });

    desc("check node version");
    task("version",function () {
        console.log("Checking node version: .");

        var packageJson = require("./package.json");
        var expectedVersion ="v"+ packageJson.engines.node;
        var actualVersion = process.version;

        if(actualVersion!==expectedVersion){
            fail("Incorrect node version : Expected"+expectedVersion +"but was actual"+actualVersion)
        }
    });
}());