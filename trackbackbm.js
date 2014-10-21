(function(d, f) {
  var s = d.createElement('script');
  s.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
  s.onload = function() {
    f(jQuery.noConflict(true));
  };
  d.body.appendChild(s);
})(document, function($) {
  $.getScript('https://www.google.com/jsapi', function() {
    google.load('feeds', '1', {
      'callback': function() {
        var entryUrl = document.location.href;
        var userScript = document.createElement('script');
        userScript.type="text/javascript";
        userScript.src='http://b.hatena.ne.jp/entry/jsonlite/?url='
          + encodeURIComponent(entryUrl)
          + '&callback=callbackBookmark';
        document.getElementsByTagName('head')[0].appendChild(userScript);
      }
    });
  });
});

function callbackBookmark(bookmark) {
  var relTrackbackRssUrl = null;
  console.log(bookmark);
  
  if(bookmark) {
    var eid = bookmark.eid;
    if(eid == '') {
      runTrackBack(null); 
    }
    var relUrl = 'http://b.hatena.ne.jp/fragments/entry.reldiary?'
               + '&key=fragments%2Fentry.reldiary.html%3Aeid%3D'
               + eid + '&ttl=1800&keys=eid%3D' + eid;
    relTrackbackRssUrl = 'http://pipes.yahoo.com/pipes/pipe.run?'
               + '_id=da86ac3f59f0ff92c537c0d8d5952b94&_render=rss'
               + '&URL=' + encodeURIComponent(relUrl)
               + '&blog=' + getBlogUrl();
  }
  runTrackBack(relTrackbackRssUrl);
}

function runTrackBack(relTrackbackRssUrl) { 
  var title = document.querySelector("h1.entry-title a");
  var header = '<h3>この記事への感想<a href="http://blog.hatena.ne.jp/my/edit?title=『' + title.text + '』の感想&body=[' + document.location.href + ':embed]" target="_blank" style="float:right">＞＞感想を書く</a></h3>'
  var defaultHtml =  "<p>この記事への感想はありません。</p><br/>";
  var fetchNum = 10;
  
  console.log(relTrackbackRssUrl);
  
  if(relTrackbackRssUrl != null) {
    console.log(relTrackbackRssUrl);
    var feed = new google.feeds.Feed(relTrackbackRssUrl);
  
    feed.setNumEntries(fetchNum);
    feed.load(function(result) {
      var r = new Array();
      if (!result.error) {
        r = result.feed.entries;
      } 
      createHtml(trackback_entry, header, r, defaultHtml, fetchNum);
    }); 
  } else {
    var r = new Array();
    createHtml(trackback_entry, header, r, defaultHtml, fetchNum);
  }
}

