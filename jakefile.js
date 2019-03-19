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
    var karma = require("simplebuild-karma");
    var shell = require("shelljs");

    var KARMA_CONFIG = "karma.conf.js";
    var DIST_DIR = "generated/dist";


    desc("start the karma server (run this first)");
    task("karma",function(){
        console.log("Start the karma server");
        karma.start({
            configFile:KARMA_CONFIG
        },complete,fail);
    },{async:true});


    //***General -purpose tasks  */
    desc("Default build");
    task("default" ,["version","lint","test"],function () {
        console.log("\n \n BUILD OK");
    });

   

    desc("Run a localhost server");
    task("run", ["build"],function(){
     jake.exec("node node_modules/http-server/bin/http-server "+ DIST_DIR ,{interactive:true},complete);
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

    desc("Run tests");
    task("test",function(){
        console.log("Testing");
        karma.run({
            configFile:KARMA_CONFIG,
            expectedBrowser:[
                "Chrome 72.0.3626 (Windows 10.0.0) is idle"
                //"Edge 17.17134.0 (Windows 10.0.0) is idle"
            ],
            strict: !process.env.loose
        },complete,fail);
    },{async:true});

    desc("Build distribution directory");
    task("build",[DIST_DIR],function(){
        console.log("Building distribution directory:.");

         shell.rm("-rf",DIST_DIR +"/*");
         shell.cp("src//content/*",DIST_DIR);
         jake.exec("node node_modules/browserify/bin/cmd.js -r ./src/javascript/tabs.js:tabs -o "+ DIST_DIR +"/bundle.js",
         {interactive:true},
          complete 
          );
    },{async:true});  
  
        

    directory(DIST_DIR);

    desc("Erase all generated files");
    task("clean",function(){
        console.log("Erasing generated files:.");
        shell.rm("-rf","generated");
    });

    desc("Lint JavaScript code");
    task("lint",function(){
        process.stdout.write("Linting JavaScript code:");

        jshint.checkFiles({
            files:["Jakefile.js","src/javascript/**/*.js"],
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
            afterEach:false,
            directory:false

            };
        }
    
}());