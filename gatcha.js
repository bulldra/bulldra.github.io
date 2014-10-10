google.load("feeds", "1");

function writeGatcha(fetchMaxNum, startNum) {
  document.write('<select id="inGatchaNum">');
  for(var i = 1; i <= fetchMaxNum; i++) {
    document.write('<option value="' + i + '"');
    if(i == startNum) {
      document.write(' selected');
    }
    document.write('>' + i + '</option>');
  }
  document.write('</select>');
			  
  document.write(' <input type="button" id="btnNormalGatcha" value=" 通常ガチャ " onClick="runNormalGatcha()" /> <input type="button" id="btnRareGatcha" value=" レアガチャ " onClick="runRareGatcha()" />');

  document.write('<span id="sideGatcha"></span>');
  switchGatchButton(false);
}

function switchGatchButton(is) {
  btnRareGatcha.disabled = !is;
  btnNormalGatcha.disabled = !is;
}

function runRareGatcha() {
  switchGatchButton(false);
  var fetchNum = inGatchaNum.value;
  var blogUrl = getBlogUrl();

  var relRssUrl = 'http://b.hatena.ne.jp/entrylist?'
    + 'sort=count'
    + '&mode=rss'
    + '&url=' + encodeURIComponent(blogUrl);
    
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
  switchGatchButton(false);
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
          createOwnHtml(sideGatcha, null,entries, null, fetchNum);
	}
    });
  }
  switchGatchButton(true);
}

google.setOnLoadCallback(runRareGatcha);

