'use strict';(function(n){"object"==typeof exports&&"object"==typeof module?n(require("../lib/codemirror"),require("../addon/search/searchcursor"),require("../addon/edit/matchbrackets")):"function"==typeof define&&define.amd?define(["../lib/codemirror","../addon/search/searchcursor","../addon/edit/matchbrackets"],n):n(CodeMirror)})(function(n){function u(a,d){a.extendSelectionsBy(function(c){if(a.display.shift||a.doc.extend||c.empty()){var k;var g=a.doc;c=c.head;if(0>d&&0==c.ch)k=g.clipPos(m(c.line-
1));else{var b=g.getLine(c.line);if(0<d&&c.ch>=b.length)k=g.clipPos(m(c.line+1,0));else{for(var g="start",h=c.ch,e=0>d?0:b.length,f=0;h!=e;h+=d,f++){var q=b.charAt(0>d?h-1:h),l="_"!=q&&n.isWordChar(q)?"w":"o";"w"==l&&q.toUpperCase()==q&&(l="W");if("start"==g)"o"!=l&&(g="in",k=l);else if("in"==g&&k!=l)if("w"==k&&"W"==l&&0>d&&h--,"W"==k&&"w"==l&&0<d)k="w";else break}k=m(c.line,h)}}return k}return 0>d?c.from():c.to()})}function v(a,d){if(a.isReadOnly())return n.Pass;a.operation(function(){for(var c=
a.listSelections().length,k=[],g=-1,b=0;b<c;b++){var h=a.listSelections()[b].head;h.line<=g||(g=m(h.line+(d?0:1),0),a.replaceRange("\n",g,null,"+insertLine"),a.indentLine(g.line,null,!0),k.push({head:g,anchor:g}),g=h.line+1)}a.setSelections(k)});a.execCommand("indentAuto")}function t(a,d){for(var c=d.ch,k=c,g=a.getLine(d.line);c&&n.isWordChar(g.charAt(c-1));)--c;for(;k<g.length&&n.isWordChar(g.charAt(k));)++k;return{from:m(d.line,c),to:m(d.line,k),word:g.slice(c,k)}}function w(a){for(var d=a.listSelections(),
c=[],k=0;k<d.length;k++){var g=d[k].head,b=a.scanForBracket(g,-1);if(!b)return!1;for(;;){g=a.scanForBracket(g,1);if(!g)return!1;if(g.ch=="(){}[]".charAt("(){}[]".indexOf(b.ch)+1)){c.push({anchor:m(b.pos.line,b.pos.ch+1),head:g.pos});break}g=m(g.pos.line,g.pos.ch+1)}}a.setSelections(c);return!0}function x(a,d){if(a.isReadOnly())return n.Pass;for(var c=a.listSelections(),k=[],g,b=0;b<c.length;b++){var h=c[b];if(!h.empty()){for(var e=h.from().line,h=h.to().line;b<c.length-1&&c[b+1].from().line==h;)h=
c[++b].to().line;c[b].to().ch||h--;k.push(e,h)}}k.length?g=!0:k.push(a.firstLine(),a.lastLine());a.operation(function(){for(var c=[],b=0;b<k.length;b+=2){var h=k[b+1],e=m(k[b],0),f=m(h),r=a.getRange(e,f,!1);d?r.sort():r.sort(function(a,c){var d=a.toUpperCase(),k=c.toUpperCase();d!=k&&(a=d,c=k);return a<c?-1:a==c?0:1});a.replaceRange(r,e,f);g&&c.push({anchor:e,head:m(h+1,0)})}g&&a.setSelections(c,0)})}function y(a,d){a.operation(function(){for(var c=a.listSelections(),k=[],b=[],e=0;e<c.length;e++){var h=
c[e];h.empty()?(k.push(e),b.push("")):b.push(d(a.getRange(h.from(),h.to())))}a.replaceSelections(b,"around","case");for(var e=k.length-1,f;0<=e;e--)h=c[k[e]],f&&0<n.cmpPos(h.head,f)||(b=t(a,h.head),f=b.from,a.replaceRange(d(b.word),b.from,b.to))})}function z(a){var d=a.getCursor("from"),c=a.getCursor("to");if(0==n.cmpPos(d,c)){var k=t(a,d);if(!k.word)return;d=k.from;c=k.to}return{from:d,to:c,query:a.getRange(d,c),word:k}}function A(a,d){var c=z(a);if(c){var k=c.query,b=a.getSearchCursor(k,d?c.to:
c.from);(d?b.findNext():b.findPrevious())?a.setSelection(b.from(),b.to()):(b=a.getSearchCursor(k,d?m(a.firstLine(),0):a.clipPos(m(a.lastLine()))),(d?b.findNext():b.findPrevious())?a.setSelection(b.from(),b.to()):c.word&&a.setSelection(c.from,c.to))}}var b=n.keyMap.sublime={fallthrough:"default"},f=n.commands,m=n.Pos,p=n.keyMap["default"]==n.keyMap.macDefault,e=p?"Cmd-":"Ctrl-",l=p?"Ctrl-":"Alt-";f[b[l+"Left"]="goSubwordLeft"]=function(a){u(a,-1)};f[b[l+"Right"]="goSubwordRight"]=function(a){u(a,1)};
p&&(b["Cmd-Left"]="goLineStartSmart");l=p?"Ctrl-Alt-":"Ctrl-";f[b[l+"Up"]="scrollLineUp"]=function(a){var d=a.getScrollInfo();if(!a.somethingSelected()){var c=a.lineAtHeight(d.top+d.clientHeight,"local");a.getCursor().line>=c&&a.execCommand("goLineUp")}a.scrollTo(null,d.top-a.defaultTextHeight())};f[b[l+"Down"]="scrollLineDown"]=function(a){var d=a.getScrollInfo();if(!a.somethingSelected()){var c=a.lineAtHeight(d.top,"local")+1;a.getCursor().line<=c&&a.execCommand("goLineDown")}a.scrollTo(null,d.top+
a.defaultTextHeight())};f[b["Shift-"+e+"L"]="splitSelectionByLine"]=function(a){for(var d=a.listSelections(),c=[],b=0;b<d.length;b++)for(var g=d[b].from(),e=d[b].to(),h=g.line;h<=e.line;++h)e.line>g.line&&h==e.line&&0==e.ch||c.push({anchor:h==g.line?g:m(h,0),head:h==e.line?e:m(h)});a.setSelections(c,0)};b["Shift-Tab"]="indentLess";f[b.Esc="singleSelectionTop"]=function(a){var d;if((d=a.listSelections())&&1<d.length)d=d[0],a.setSelection(d.anchor,d.head,{scroll:!1});else return n.Pass};f[b[e+"L"]=
"selectLine"]=function(a){for(var d=a.listSelections(),c=[],b=0;b<d.length;b++){var g=d[b];c.push({anchor:m(g.from().line,0),head:m(g.to().line+1,0)})}a.setSelections(c)};b["Shift-Ctrl-K"]="deleteLine";f[b[e+"Enter"]="insertLineAfter"]=function(a){return v(a,!1)};f[b["Shift-"+e+"Enter"]="insertLineBefore"]=function(a){return v(a,!0)};f[b[e+"D"]="selectNextOccurrence"]=function(a){var d=a.getCursor("from"),c=a.getCursor("to"),b=a.state.sublimeFindFullWord==a.doc.sel;if(0==n.cmpPos(d,c)){b=t(a,d);if(!b.word)return;
a.setSelection(b.from,b.to);b=!0}else{var d=a.getRange(d,c),d=b?new RegExp("\\b"+d+"\\b"):d,c=a.getSearchCursor(d,c),g=c.findNext();g||(c=a.getSearchCursor(d,m(a.firstLine(),0)),g=c.findNext());if(!(d=!g))a:{for(var d=a.listSelections(),g=c.from(),e=c.to(),h=0;h<d.length;h++)if(d[h].from()==g&&d[h].to()==e){d=!0;break a}d=!1}if(d)return n.Pass;a.addSelection(c.from(),c.to())}b&&(a.state.sublimeFindFullWord=a.doc.sel)};f[b["Shift-"+e+"Space"]="selectScope"]=function(a){w(a)||a.execCommand("selectAll")};
f[b["Shift-"+e+"M"]="selectBetweenBrackets"]=function(a){if(!w(a))return n.Pass};f[b[e+"M"]="goToBracket"]=function(a){a.extendSelectionsBy(function(d){var c=a.scanForBracket(d.head,1);return c&&0!=n.cmpPos(c.pos,d.head)?c.pos:(c=a.scanForBracket(d.head,-1))&&m(c.pos.line,c.pos.ch+1)||d.head})};l=p?"Cmd-Ctrl-":"Shift-Ctrl-";f[b[l+"Up"]="swapLineUp"]=function(a){if(a.isReadOnly())return n.Pass;for(var d=a.listSelections(),c=[],b=a.firstLine()-1,g=[],e=0;e<d.length;e++){var h=d[e],f=h.from().line-1,
l=h.to().line;g.push({anchor:m(h.anchor.line-1,h.anchor.ch),head:m(h.head.line-1,h.head.ch)});0!=h.to().ch||h.empty()||--l;f>b?c.push(f,l):c.length&&(c[c.length-1]=l);b=l}a.operation(function(){for(var d=0;d<c.length;d+=2){var b=c[d],k=c[d+1],e=a.getLine(b);a.replaceRange("",m(b,0),m(b+1,0),"+swapLine");k>a.lastLine()?a.replaceRange("\n"+e,m(a.lastLine()),null,"+swapLine"):a.replaceRange(e+"\n",m(k,0),null,"+swapLine")}a.setSelections(g);a.scrollIntoView()})};f[b[l+"Down"]="swapLineDown"]=function(a){if(a.isReadOnly())return n.Pass;
for(var d=a.listSelections(),c=[],b=a.lastLine()+1,e=d.length-1;0<=e;e--){var f=d[e],h=f.to().line+1,l=f.from().line;0!=f.to().ch||f.empty()||h--;h<b?c.push(h,l):c.length&&(c[c.length-1]=l);b=l}a.operation(function(){for(var d=c.length-2;0<=d;d-=2){var b=c[d],k=c[d+1],e=a.getLine(b);b==a.lastLine()?a.replaceRange("",m(b-1),m(b),"+swapLine"):a.replaceRange("",m(b,0),m(b+1,0),"+swapLine");a.replaceRange(e+"\n",m(k,0),null,"+swapLine")}a.scrollIntoView()})};f[b[e+"/"]=b[e+"7"]="toggleComment"]=function(a){a.toggleComment({indent:!0})};
f[b[e+"Shift-/"]=b[e+"Shift-7"]="toggleBlockComment"]=function(a){a.toggleComment({indent:!0,blockComment:!0})};f[b[e+"J"]="joinLines"]=function(a){for(var d=a.listSelections(),b=[],k=0;k<d.length;k++){for(var e=d[k],f=e.from(),h=f.line,l=e.to().line;k<d.length-1&&d[k+1].from().line==l;)l=d[++k].to().line;b.push({start:h,end:l,anchor:!e.empty()&&f})}a.operation(function(){for(var d=0,e=[],k=0;k<b.length;k++){for(var g=b[k],h=g.anchor&&m(g.anchor.line-d,g.anchor.ch),f,l=g.start;l<=g.end;l++){var n=
l-d;l==g.end&&(f=m(n,a.getLine(n).length+1));n<a.lastLine()&&(a.replaceRange(" ",m(n),m(n+1,/^\s*/.exec(a.getLine(n+1))[0].length)),++d)}e.push({anchor:h||f,head:f})}a.setSelections(e,0)})};f[b["Shift-"+e+"D"]="duplicateLine"]=function(a){a.operation(function(){for(var d=a.listSelections().length,b=0;b<d;b++){var e=a.listSelections()[b];e.empty()?a.replaceRange(a.getLine(e.head.line)+"\n",m(e.head.line,0)):a.replaceRange(a.getRange(e.from(),e.to()),e.from())}a.scrollIntoView()})};p||(b[e+"T"]="transposeChars");
f[b.F9="sortLines"]=function(a){x(a,!0)};f[b[e+"F9"]="sortLinesInsensitive"]=function(a){x(a,!1)};b.F2="nextBookmark";b["Shift-F2"]="prevBookmark";b[e+"F2"]="toggleBookmark";b["Shift-"+e+"F2"]="clearBookmarks";b["Alt-F2"]="selectBookmarks";b["Alt-Q"]="wrapLines";l=e+"K ";b[l+e+"Backspace"]="delLineLeft";f[b.Backspace="smartBackspace"]=function(a){if(a.somethingSelected())return n.Pass;a.operation(function(){for(var b=a.listSelections(),c=a.getOption("indentUnit"),e=b.length-1;0<=e;e--){var g=b[e].head,
f=a.getRange({line:g.line,ch:0},g),h=n.countColumn(f,null,a.getOption("tabSize")),l=a.findPosH(g,-1,"char",!1);f&&!/\S/.test(f)&&0==h%c&&(f=new m(g.line,n.findColumn(f,h-c,c)),f.ch!=g.ch&&(l=f));a.replaceRange("",l,g,"+delete")}})};f[b[l+e+"K"]="delLineRight"]=function(a){a.operation(function(){for(var b=a.listSelections(),c=b.length-1;0<=c;c--)a.replaceRange("",b[c].anchor,m(b[c].to().line),"+delete");a.scrollIntoView()})};f[b[l+e+"U"]="upcaseAtCursor"]=function(a){y(a,function(a){return a.toUpperCase()})};
f[b[l+e+"L"]="downcaseAtCursor"]=function(a){y(a,function(a){return a.toLowerCase()})};f[b[l+e+"Space"]="setSublimeMark"]=function(a){a.state.sublimeMark&&a.state.sublimeMark.clear();a.state.sublimeMark=a.setBookmark(a.getCursor())};f[b[l+e+"A"]="selectToSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();b&&a.setSelection(a.getCursor(),b)};f[b[l+e+"W"]="deleteToSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();if(b){var c=a.getCursor();if(0<
n.cmpPos(c,b))var e=b,b=c,c=e;a.state.sublimeKilled=a.getRange(c,b);a.replaceRange("",c,b)}};f[b[l+e+"X"]="swapWithSublimeMark"]=function(a){var b=a.state.sublimeMark&&a.state.sublimeMark.find();b&&(a.state.sublimeMark.clear(),a.state.sublimeMark=a.setBookmark(a.getCursor()),a.setCursor(b))};f[b[l+e+"Y"]="sublimeYank"]=function(a){null!=a.state.sublimeKilled&&a.replaceSelection(a.state.sublimeKilled,null,"paste")};b[l+e+"G"]="clearBookmarks";f[b[l+e+"C"]="showInCenter"]=function(a){var b=a.cursorCoords(null,
"local");a.scrollTo(null,(b.top+b.bottom)/2-a.getScrollInfo().clientHeight/2)};p=p?"Ctrl-Shift-":"Ctrl-Alt-";f[b[p+"Up"]="selectLinesUpward"]=function(a){a.operation(function(){for(var b=a.listSelections(),c=0;c<b.length;c++){var e=b[c];e.head.line>a.firstLine()&&a.addSelection(m(e.head.line-1,e.head.ch))}})};f[b[p+"Down"]="selectLinesDownward"]=function(a){a.operation(function(){for(var b=a.listSelections(),c=0;c<b.length;c++){var e=b[c];e.head.line<a.lastLine()&&a.addSelection(m(e.head.line+1,e.head.ch))}})};
f[b[e+"F3"]="findUnder"]=function(a){A(a,!0)};f[b["Shift-"+e+"F3"]="findUnderPrevious"]=function(a){A(a,!1)};f[b["Alt-F3"]="findAllUnder"]=function(a){var b=z(a);if(b){for(var c=a.getSearchCursor(b.query),e=[],f=-1;c.findNext();)e.push({anchor:c.from(),head:c.to()}),c.from().line<=b.from.line&&c.from().ch<=b.from.ch&&f++;a.setSelections(e,f)}};b["Shift-"+e+"["]="fold";b["Shift-"+e+"]"]="unfold";b[l+e+"0"]=b[l+e+"J"]="unfoldAll";b[l+e+"1"]="foldAll";b[e+"I"]="findIncremental";b["Shift-"+e+"I"]="findIncrementalReverse";
b[e+"H"]="replace";b.F3="findNext";b["Shift-F3"]="findPrev";n.normalizeKeyMap(b)});