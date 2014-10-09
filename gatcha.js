google.load("feeds", "1");

function runSideRareGatcha() {
  side_raregatcha_button.disabled = true;
  side_gatcha_button.disabled = true;
  var fetchNum = side_gatcha_num.value;

  var relRssUrl = 'http://b.hatena.ne.jp/entrylist?'
    + 'sort=count'
    + '&mode=rss'
    + '&url=' + encodeURIComponent(blogURL);
    
    var feed = new google.feeds.Feed(relRssUrl);
    feed.setNumEntries(30);
    feed.load(function(result) {
      var entries = new Array();
      if (!result.error && result.feed.entries.length > 0) {
        entries = result.feed.entries;
      }
      console.log("result.length="+ entries.length);
      createHtml(side_gatch, null,entries, null, fetchNum);
    });  
  side_raregatcha_button.disabled = false;
  side_gatcha_button.disabled = false;
}

function runSideGatcha() {
  side_raregatcha_button.disabled = true;
  side_gatcha_button.disabled = true;
  var fetchNum = side_gatcha_num.value;
  var maxNum = 10;

  var feeds = new Array();
  for (var i = 1; i <= maxNum; i++) {
    var rssUrl = 'http://pipes.yahoo.com/pipes/pipe.run?url='
            + encodeURIComponent(blogURL + '/sitemap.xml?page=' + i)
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
          createHtml(side_gatch, null,entries, null, fetchNum);
	}
    });
  }
  side_raregatcha_button.disabled = false;
  side_gatcha_button.disabled = false;
}

google.setOnLoadCallback(runSideRareGatcha);

