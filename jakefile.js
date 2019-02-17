/*global:{
    desc:false,
    task:false,
    complete:false,
    fail:false

} */

(function () {
    "use strict";

    var semver = require("semver");
    var jshint = require("simplebuild-jshint");
   // var karma = require("simplebuild-karma");


    desc("start the karma server (run this first)");
    task("karma",function(){
        console.log("Start the karma server");
    });
    //***General -purpose tasks  */
    desc("Default build");
    task("default" ,["version","lint"],function () {
        console.log("\n \n BUILD OK");
    });

   

    desc("Run a localhost server");
    task("run", function(){
     jake.exec("node node_modules/http-server/bin/http-server src",{interactive:true},complete);
        console.log("Run http-server");
     });

    // //*Supporting task*/
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
        process.stdout.write("Linting JavaScript code:");

        jshint.checkFiles({
            files:["Jakefile.js","src/**/*.js"],
            options: lintOption(),
            globals:lintGlobal(),
        },
        complete,fail);
       },{async:true});

     function lintOption(){
         return {
            bitwise:true,
            eqeqeq:true,
            forin:true,
            freeze:true,
            futurehostile:true,
            latedef:"nofunc",
            noarg:true,
            nocomma:true,
            nonbsp:true,
            nonew:true,
            strict:true,
            undef:true,
            node:true,
            browser:true
         };
        }
    
     function lintGlobal(){
         return {
            jake:false,
            desc:false,
            task:false,
            complete:false,
            fail:false,
            describe:false,
            it:false,
            before:false,
            after:false,
            beforeEach:false,
            afterEach:false

            };
        }
    
}());