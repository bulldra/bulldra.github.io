﻿google.load("feeds","1");
function writeGatcha(b,a,c,d,h){if(void 0===a||null==a)a="side-";if(void 0===h||null==h||1!=h)h=!1;var f=null;if("category"==c){var e=document.querySelectorAll("div.categories a");if(null!=e&&0<e.length){for(var f=[],g=0;g<e.length;g++){var k=e[g].href,l=k.replace(getBlogUrl(),"");console.log(l);0>l.indexOf("-")&&0<=k.indexOf(getBlogUrl()+"/archive/category/")&&f.push(e[g])}g=Math.floor(Math.random()*f.length);f=f[g]}}e="";e=void 0!==f&&null!=f?f.href.replace(getBlogUrl()+"/archive/category/",""):
"recent"==c?"gatcha-new":"";void 0!==d&&null!=d?(document.write('<span class="hatena-module-foot"><h3>'+d),500<window.innerWidth?(document.write('<span style="float:right">'),writeForm(a,e,b,h),document.write("</span></h3>")):(document.write("</h3>"),writeForm(a,e,b)),document.write("</span>")):writeForm(a,e,b);document.write('<span id="'+a+'gachaSpan"></span>');switchGatchButton(!1,a)}
function writeForm(b,a,c,d){document.write('<select id="'+b+'inGatchaCategory" onchange="runGatcha(\''+b+'\')" style="width:150px;"><select>');document.write(' <input type="button" id="'+b+'btnNormalGatcha" value=" \u66f4\u65b0 " onClick="runGatcha(\''+b+"')\" />");document.write(' <input type="button" id="'+b+'btnMoveGatcha" value=" \u4e00\u89a7 " onClick="moveGatcha(\''+b+"')\" />");d&&document.write(' <input type="button" id="'+b+'btnFeedlyGatcha" value=" \u8cfc\u8aad " onClick="feedGatcha(\''+
b+"')\" />");document.write('<input type="hidden" id="'+b+'inGatchaNum" value="'+c+'" />');document.write('<input type="hidden" id="'+b+'mode" value="'+a+'" />');b=document.getElementById(b+"inGatchaCategory");b.appendChild(createOption("gatcha-rare","\u4eba\u6c17"));b.appendChild(createOption("gatcha-new","\u6700\u65b0"));b.selectedIndex=1}
function writeGatchaCategory(b){if(void 0===b||null==b)b="side-";var a=getBlogUrl(),c=document.getElementById(b+"inGatchaCategory"),a=document.getElementById(b+"mode").value.replace(a+"/archive/category/",""),a=createOption(a,decodeURI(a));c.appendChild(a);a.selected=!0;runGatcha(b)}function createOption(b,a){var c=document.createElement("option");c.value=b;c.text=a;return c}
function switchGatchButton(b,a){document.getElementById(a+"btnNormalGatcha").disabled=!b;document.getElementById(a+"btnMoveGatcha").disabled=!b;document.getElementById(a+"inGatchaCategory").disabled=!b;var c=document.getElementById(a+"btnFeedlyGatcha");null!=c&&(c.disabled=!b)}
function feedGatcha(b){switchGatchButton(!1,b);var a="",a=getBlogUrl(),c=document.getElementById(b+"inGatchaCategory"),d=c.selectedIndex,a=0==d||2==d?a+"/feed":1==d?"http://b.hatena.ne.jp/entrylist?sort=count&mode=rss&url="+encodeURIComponent(a):a+"/rss/category/"+c.value;switchGatchButton(!0,b);window.open("http://cloud.feedly.com/#subscription%2Ffeed%2F"+encodeURIComponent(a))}
function moveGatcha(b){switchGatchButton(!1,b);var a="",a=getBlogUrl(),c=document.getElementById(b+"inGatchaCategory"),d=c.selectedIndex,a=0==d||2==d?a+"/archive":1==d?"http://b.hatena.ne.jp/entrylist?sort=count&url="+encodeURIComponent(a):a+"/archive/category/"+c.value;switchGatchButton(!0,b);location.href=a}
function runGatcha(b){switchGatchButton(!1,b);var a=document.getElementById(b+"inGatchaCategory"),c=a.selectedIndex;0==c?runRareGatcha(b):1==c?runNewGatcha(b):runCategoryGatcha(b,a.value);switchGatchButton(!0,b)}
function runCommonGatcha(b,a){var c=document.getElementById(b+"inGatchaNum").value,d=new google.feeds.Feed(a);d.setNumEntries(50);d.load(function(a){var d=[];!a.error&&0<a.feed.entries.length&&(d=a.feed.entries);d=removeThisEntry(d);a=document.getElementById(b+"gachaSpan");createOwnHtml(a,null,d,null,c)})}function runNewGatcha(b){var a=getBlogUrl();runCommonGatcha(b,a+"/rss")}
function runRareGatcha(b){var a=getBlogUrl(),a="http://b.hatena.ne.jp/entrylist?sort=count&mode=rss&url="+encodeURIComponent(a);runCommonGatcha(b,a)}function runCategoryGatcha(b,a){var c=getBlogUrl()+"/rss/category/"+a;runCommonGatcha(b,c)};