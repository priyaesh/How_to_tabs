(function () {
    "use strict";

    var semver = require("semver");

    desc("Default build");
    task("default" ,["version","lint"],function () {
        console.log("\n \n BUILD OK");
    });

    desc("check node version");
    task("version",function () {
        console.log("Checking node version: .");

        var packageJson = require("./package.json");
        var expectedVersion ="v"+ packageJson.engines.node;
        var actualVersion = process.version;
       
        if(semver.neq(expectedVersion,actualVersion)){
            fail("Incorrect node version : Expected"+expectedVersion +"but was actual"+actualVersion);
        }
    });

    desc("Lint JavaScript code");
    task("lint",function(){
        console.log("Linting JavaScript code:.");

        jake.exec(" node node_modules/jshint/bin/jshint jakefile.js", {interactive:true},complete);
    },{ async:true} ); 
}());