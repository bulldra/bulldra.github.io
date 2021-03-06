﻿google.load("feeds", "1");

function writeGatcha(fetchNum, id, mode, header, isFeed) {
  if(id === undefined || id == null){ 
    id = 'side-';
  }
  
  if(isFeed === undefined || isFeed == null || isFeed != true){ 
    isFeed = false;
  }

  var categoryElement = null;
  if(mode == 'category') {
     var categoryElements = document.querySelectorAll('div.categories a');
     if (categoryElements != null && categoryElements.length > 0) {
       var rootCategoryElements = new Array();
       for (var idx = 0; idx < categoryElements.length; idx++) {
         var href = categoryElements[idx].href;
	       var hrefc = href.replace(getBlogUrl(),'');
	       console.log(hrefc);
         if (hrefc.indexOf('-') < 0 && href.indexOf(getBlogUrl() + '/archive/category/') >= 0) {
           rootCategoryElements.push(categoryElements[idx]);
         }
       }
       var idx = Math.floor(Math.random() * rootCategoryElements.length);
       categoryElement = rootCategoryElements[idx];
     }
  }

  var categoryHref = ''; 
  if(categoryElement !== undefined && categoryElement != null) {
	  categoryHref = categoryElement.href.replace(getBlogUrl() + '/archive/category/','');
  } else if(mode == 'recent') {
	  categoryHref = 'gatcha-new';
  } else {
	  categoryHref = ''; 
  }
  
  if(header !== undefined && header != null) {
    document.write('<span class="hatena-module-foot"><h3>' + header);
    if (window.innerWidth > 500) {
      document.write('<span style="float:right">');
      writeForm(id, categoryHref, fetchNum, isFeed);
      document.write('</span></h3>');
    } else {
      document.write('</h3>');
      writeForm(id, categoryHref, fetchNum);
    }
    document.write('</span>');
  } else {
    writeForm(id, categoryHref, fetchNum);
  }
  document.write('<span id="' + id + 'gachaSpan"></span>');
  switchGatchButton(false, id);
}

function writeForm(id, categoryHref, fetchNum, isFeed) {
    document.write('<select id="' + id + 'inGatchaCategory" onchange="runGatcha(\'' + id + '\')" style="width:150px;"><select>');
    document.write(' <input type="button" id="' + id + 'btnNormalGatcha" value=" 更新 " onClick="runGatcha(\'' + id + '\')" />');
    document.write(' <input type="button" id="' + id + 'btnMoveGatcha" value=" 一覧 " onClick="moveGatcha(\'' + id + '\')" />');

    if(isFeed) {
      document.write(' <input type="button" id="' + id + 'btnFeedlyGatcha" value=" 購読 " onClick="feedGatcha(\'' + id + '\')" />');
    }
    document.write('<input type="hidden" id="' + id + 'inGatchaNum" value="' + fetchNum + '" />');
    document.write('<input type="hidden" id="'+ id + 'mode" value="' + categoryHref + '" />');
    
    var s = document.getElementById(id + 'inGatchaCategory');
    s.appendChild(createOption('gatcha-rare','人気'));
    s.appendChild(createOption('gatcha-new','最新'));
    s.selectedIndex = 1;
}

function writeGatchaCategory(id) {
  if(id === undefined || id == null){ 
    id = 'side-';
  }

  var blogURL = getBlogUrl();
  var s = document.getElementById(id + 'inGatchaCategory');   
  var gatchaCategory = document.getElementById(id + 'mode');    
  var value = gatchaCategory.value.replace(blogURL + '/archive/category/', '')
  var o = createOption(value, decodeURI(value));
  s.appendChild(o);      
  o.selected = true;
    
  runGatcha(id);
}

function createOption(value, name) {
    var option = document.createElement('option');
    option.value = value;
    option.text = name;
    return option;
}

function switchGatchButton(is, id) {
  document.getElementById(id + 'btnNormalGatcha').disabled = !is;
  document.getElementById(id + 'btnMoveGatcha').disabled = !is;
  document.getElementById(id + 'inGatchaCategory').disabled = !is;  
  var f = document.getElementById(id + 'btnFeedlyGatcha');
  if(f != null) {
    f.disabled = !is;
  }
}

function feedGatcha(id) {
  switchGatchButton(false, id);
  var href = '';
  var blogUrl = getBlogUrl();
  var s = document.getElementById(id + 'inGatchaCategory');
  var si = s.selectedIndex;
  if(si == 0 || si == 2) {
    href = blogUrl + '/feed';
  } else if(si== 1) {
    href = 'http://b.hatena.ne.jp/entrylist?'
      + 'sort=count'
      + '&mode=rss'
      + '&url=' + encodeURIComponent(blogUrl);
  } else {
    href = blogUrl + '/rss/category/' + s.value;
  }
  switchGatchButton(true, id);
  window.open('http://cloud.feedly.com/#subscription%2Ffeed%2F' + encodeURIComponent(href));
}

function moveGatcha(id) {
  switchGatchButton(false, id);
  var href = '';
  var blogUrl = getBlogUrl();
  var s = document.getElementById(id + 'inGatchaCategory');
  var si = s.selectedIndex;
  if(si == 0 || si == 2) {
    href = blogUrl + '/archive';
  } else if(si== 1) {
    href = 'http://b.hatena.ne.jp/entrylist?'
      + 'sort=count'
      + '&url=' + encodeURIComponent(blogUrl);
  } else {
    href = blogUrl + '/archive/category/' + s.value;
  }
  switchGatchButton(true, id);
  location.href = href;
}

function runGatcha(id) {
  switchGatchButton(false, id);
  var s = document.getElementById(id + 'inGatchaCategory');
  var si = s.selectedIndex;
  if(si== 0) {
	  runRareGatcha(id);
  } else if(si == 1) {
	  runNewGatcha(id);
  } else {
	  runCategoryGatcha(id, s.value);
  }
  switchGatchButton(true, id);
}

function runCommonGatcha(id, rss) {
  var fetchNum = document.getElementById(id +'inGatchaNum').value;
  var feed = new google.feeds.Feed(rss);
  feed.setNumEntries(50);
  feed.load(function(result) {
    var entries = new Array();
    if (!result.error && result.feed.entries.length > 0) {
        entries = result.feed.entries;
    } else {
    }
    entries = removeThisEntry(entries);
    var span = document.getElementById(id + 'gachaSpan');
    createOwnHtml(span, null,entries, null, fetchNum);
  });  
}

function runNewGatcha(id) {
  var blogUrl = getBlogUrl();
  runCommonGatcha(id, blogUrl + '/rss');
}

function runRareGatcha(id) {
  var blogUrl = getBlogUrl();
  var relRssUrl = 'http://b.hatena.ne.jp/entrylist?'
    + 'sort=count'
    + '&mode=rss'
    + '&url=' + encodeURIComponent(blogUrl);
  runCommonGatcha(id, relRssUrl);
}

function runCategoryGatcha(id, categoryName) {
  var blogUrl = getBlogUrl();
  var relRssUrl = blogUrl + '/rss/category/' + categoryName;
  runCommonGatcha(id, relRssUrl);
}


