google.load("feeds", "1");

function runViewRss(id, rss, fetchNum) {
    var feed = new google.feeds.Feed(rss);
    feed.setNumEntries(fetchNum);
      feed.load(function(result) {
      var entries = new Array();
      if (!result.error && result.feed.entries.length > 0) {
        entries = result.feed.entries;
      } else {
	console.log(result.error);
      }
      var span = document.getElementById(id);

      createHtml(span, null, entries, null, fetchNum, false);
  });  
}

