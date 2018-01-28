'use strict';(function(b){"object"==typeof exports&&"object"==typeof module?b(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],b):b(CodeMirror)})(function(b){function h(a,d,c,l){function f(c){var b=h(a,d);if(!b||b.to.line-b.from.line<k)return null;for(var f=a.findMarksAt(b.from),e=0;e<f.length;++e)if(f[e].__isFold&&"fold"!==l){if(!c)return null;b.cleared=!0;f[e].clear()}return b}if(c&&c.call){var h=c;c=null}else h=g(a,c,"rangeFinder");"number"==
typeof d&&(d=b.Pos(d,0));var k=g(a,c,"minFoldSize"),e=f(!0);if(g(a,c,"scanUp"))for(;!e&&d.line>a.firstLine();)d=b.Pos(d.line-1,0),e=f(!1);if(e&&!e.cleared&&"unfold"!==l){var m=p(a,c);b.on(m,"mousedown",function(a){n.clear();b.e_preventDefault(a)});var n=a.markText(e.from,e.to,{replacedWith:m,clearOnEnter:g(a,c,"clearOnEnter"),__isFold:!0});n.on("clear",function(c,d){b.signal(a,"unfold",a,c,d)});b.signal(a,"fold",a,e.from,e.to)}}function p(a,d){var c=g(a,d,"widget");if("string"==typeof c){var b=document.createTextNode(c),
c=document.createElement("span");c.appendChild(b);c.className="CodeMirror-foldmarker"}return c}function g(a,d,c){return d&&void 0!==d[c]?d[c]:(a=a.options.foldOptions)&&void 0!==a[c]?a[c]:k[c]}b.newFoldFunction=function(a,d){return function(c,b){h(c,b,{rangeFinder:a,widget:d})}};b.defineExtension("foldCode",function(a,d,c){h(this,a,d,c)});b.defineExtension("isFolded",function(a){a=this.findMarksAt(a);for(var d=0;d<a.length;++d)if(a[d].__isFold)return!0});b.commands.toggleFold=function(a){a.foldCode(a.getCursor())};
b.commands.fold=function(a){a.foldCode(a.getCursor(),null,"fold")};b.commands.unfold=function(a){a.foldCode(a.getCursor(),null,"unfold")};b.commands.foldAll=function(a){a.operation(function(){for(var d=a.firstLine(),c=a.lastLine();d<=c;d++)a.foldCode(b.Pos(d,0),null,"fold")})};b.commands.unfoldAll=function(a){a.operation(function(){for(var d=a.firstLine(),c=a.lastLine();d<=c;d++)a.foldCode(b.Pos(d,0),null,"unfold")})};b.registerHelper("fold","combine",function(){var a=Array.prototype.slice.call(arguments,
0);return function(d,c){for(var b=0;b<a.length;++b){var f=a[b](d,c);if(f)return f}}});b.registerHelper("fold","auto",function(a,b){for(var c=a.getHelpers(b,"fold"),g=0;g<c.length;g++){var f=c[g](a,b);if(f)return f}});var k={rangeFinder:b.fold.auto,widget:"\u2194",minFoldSize:0,scanUp:!1,clearOnEnter:!0};b.defineOption("foldOptions",null);b.defineExtension("foldOption",function(a,b){return g(this,a,b)})});