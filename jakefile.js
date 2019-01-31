(function () {
    "use strict";
    console.log("\n \n BUILD OK");

    desc("Default build");
    task("default" ,function () {
        console.log("Hello i am default task");
    });

    desc("Pure ridiculosity");
    task("gooble",function () {
        console.log("goodle doole");


    });
}());