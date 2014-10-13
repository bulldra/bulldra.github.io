google.load("feeds", "1");

function writeGatcha(fetchNum) {
  document.write('<select id="inGatchaCategory" onchange="runGatcha()" style="width:150px"><select>');
  document.write(' <input type="button" id="btnNormalGatcha" value=" 更新 " onClick="runGatcha()" />');
  document.write(' <input type="button" id="btnMoveGatcha" value=" 一覧 " onClick="moveGatcha()" />');
  document.write('<input type="hidden" id="inGatchaNum", value="' + fetchNum + '" />');
  document.write('<span id="sideGatcha"></span>');
  switchGatchButton(false);

  var s = inGatchaCategory;
  s.appendChild(createOption('all','全て'));
  s.appendChild(createOption('rare','人気'));
  s.selectedIndex = 1;
}

function createOption(value, name) {
    var option = document.createElement('option');
    option.value = value;
    option.innerText = name;
    return option;
}

function writeGatchaCategory() {
  var blogURL = getBlogUrl();
  var relRssUrl = 'http://pipes.yahoo.com/pipes/pipe.run?'
    + '&blog=' + blogURL
    + '&_id=31da73e0525591d9dd0c0702856a3b5b&_render=rss';
  console.log(relRssUrl);

  var feed = new google.feeds.Feed(relRssUrl);
  feed.setNumEntries(100);
  feed.load(function(result) {
    var s = inGatchaCategory;

    var entries = new Array();
    if (!result.error && result.feed.entries.length > 0) {
      entries = result.feed.entries;
    }

    for(var idx = 0; idx < entries.length; idx++) {
      var e = entries[idx];
      if(e.link.indexOf('-') >= 0) {
        continue;
      }
      var o = createOption(e.link.replace(blogURL + '/category/', ''), e.title);
      s.appendChild(o);
    }
  });
}

function switchGatchButton(is) {
  btnNormalGatcha.disabled = !is;
  btnMoveGatcha.disabled = !is;
  inGatchaCategory.disabled = !is;
}

function moveGatcha() {
  switchGatchButton(false);
  var href = '';
  var blogUrl = getBlogUrl();
  var s = inGatchaCategory;
  var si = s.selectedIndex;
  if(si == 0)	{
    href = blogUrl + '/archive';
  } else if(si== 1) {
    href = 'http://b.hatena.ne.jp/entrylist?'
      + 'sort=count'
      + '&url=' + encodeURIComponent(blogUrl);
  } else {
    href = blogUrl + '/archive/category/' + s.value;
  }
  console.log(blogUrl);
  switchGatchButton(true);
  location.href = href;
}


function runGatcha() {
  switchGatchButton(false);
  var s = inGatchaCategory;
  var si = s.selectedIndex;
  if(si == 0)	{
	  runNormalGatcha();
  } else if(si== 1) {
	  runRareGatcha();
  } else {
	  runCategoryGatcha(s.value);
  }
  switchGatchButton(true);
}

function runRareGatcha() {
  var fetchNum = inGatchaNum.value;
  var blogUrl = getBlogUrl();

  var relRssUrl = 'http://b.hatena.ne.jp/entrylist?'
    + 'sort=count'
    + '&mode=rss'
    + '&url=' + encodeURIComponent(blogUrl);
  console.log(relRssUrl);
    
    var feed = new google.feeds.Feed(relRssUrl);
    feed.setNumEntries(30);
    feed.load(function(result) {
      var entries = new Array();
      if (!result.error && result.feed.entries.length > 0) {
        entries = result.feed.entries;
      }
      console.log("result.length="+ entries.length);
      entries = removeThisEntry(entries);
      createOwnHtml(sideGatcha, null,entries, null, fetchNum);
    });  
  switchGatchButton(true);
}

function runNormalGatcha() {
  var fetchNum = inGatchaNum.value;
  var maxNum = 10;
  var blogUrl = getBlogUrl();

  var feeds = new Array();
  for (var i = 1; i <= maxNum; i++) {
    var rssUrl = 'http://pipes.yahoo.com/pipes/pipe.run?url='
            + encodeURIComponent(blogUrl + '/sitemap.xml?page=' + i)
            + '&_id=f48751a13b81b177ba69aa786f7354bf&_render=rss'
    feeds.push(new google.feeds.Feed(rssUrl));
  }

  var entries = new Array();
  var c = 0;
  for(var i = 0; i < feeds.length; i++) {
    feeds[i].setNumEntries(100);
    feeds[i].load(function(result) {
        if (result.error || result.feed.entries.length == 0) {
          ;
        } else {
          entries = entries.concat(result.feed.entries);
          console.log("result[" + c + "].length="+ result.feed.entries.length);
        }

	if(++c == feeds.length){
          entries = removeThisEntry(entries);
          console.log("result.length="+ entries.length);
          createOwnHtml(sideGatcha, null,entries, null, fetchNum);
	}
    });
  }
}

function runCategoryGatcha(categoryName) {
  var fetchNum = inGatchaNum.value;
  var blogUrl = getBlogUrl();

  var relRssUrl = 'http://pipes.yahoo.com/pipes/pipe.run?'
	      + 'blog=' + blogUrl
	      + '&category=' + categoryName
              + '&myurl=' + document.location.href
              + '&_id=60ec48592b55d11f71206be81d7c0881'
	      + '&_render=rss'
  console.log(relRssUrl);
    
    var feed = new google.feeds.Feed(relRssUrl);
    feed.setNumEntries(50);
    feed.load(function(result) {
      var entries = new Array();
      if (!result.error && result.feed.entries.length > 0) {
        entries = result.feed.entries;
      }
      console.log("result.length="+ entries.length);
      entries = removeThisEntry(entries);
      createOwnHtml(sideGatcha, null,entries, null, fetchNum);
    });  
}

google.setOnLoadCallback(writeGatchaCategory);
google.setOnLoadCallback(runGatcha);

