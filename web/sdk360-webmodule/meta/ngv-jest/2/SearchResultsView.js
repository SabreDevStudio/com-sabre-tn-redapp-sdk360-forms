var reflex = require('ngv-jest-platform');
var _0 = require("..\\..\\..\\..\\sabre-ngv-app\\module.js");
var _1 = require("..\\..\\..\\..\\sabre-ngv-core\\module.js");
var _2 = require("..\\..\\..\\..\\sabre-ngv-xp\\module.js");
var _3 = require("..\\..\\..\\module.js");

var module = reflex.require("sdk360-webmodule/customForm/SearchResultsView");
reflex.initModule({"name":"sdk360-webmodule","version":"4.8.6","meta":{},"dependencies":["sabre-ngv-app","sabre-ngv-core","sabre-ngv-xp"],"submodules":["sdk360-webmodule/Context","sdk360-webmodule/customForm/CmdHelperButton","sdk360-webmodule/customForm/EventsType","sdk360-webmodule/customForm/EventType","sdk360-webmodule/customForm/RequestType","sdk360-webmodule/customForm/RequestTypeAsRequestData","sdk360-webmodule/customForm/SearchResultsDrawer","sdk360-webmodule/customForm/SearchResultsRow","sdk360-webmodule/customForm/SearchResultsView","sdk360-webmodule/index","sdk360-webmodule/Main","sdk360-webmodule/customForm/CmdHelperForm"],"hasTemplates":true,"hasStyles":true});

for( var i in module ) {
    if( module.hasOwnProperty(i) ) {
        exports[i] = module[i];
    }
}
