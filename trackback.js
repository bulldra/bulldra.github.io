google.load("feeds", "1");
runTrackBack(null); 

function runBookmark() {
  var entryUrl = document.location.href;
  var userScript = document.createElement('script');
  userScript.type="text/javascript";
  userScript.src='http://b.hatena.ne.jp/entry/jsonlite/?url='
          + encodeURIComponent(entryUrl)
          + '&callback=callbackBookmark';
  document.getElementsByTagName('head')[0].appendChild(userScript);
}
google.setOnLoadCallback(runBookmark);

function callbackBookmark(bookmark) {
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
    runTrackBack(relTrackbackRssUrl); 
  } 
}

function runTrackBack(relTrackbackRssUrl) { 
  var isImpression = false;
  var s = document.querySelector("span#trackback_entry");
  if(s != null && s.className == 'impression') {
    isImpression = true;
  }

  var title = document.querySelector("h1.entry-title a");
  var titleName = '';
  if(title != null) {
    titleName = '『' + title.text + '』';
  }
  
  var header = '<h3>この記事への言及<a href="http://blog.hatena.ne.jp/my/edit?title=' + titleName +'に言及する&body=[' + document.location.href + ':embed]" target="_blank" style="float:right">＞＞言及する</a></h3>'
  var defaultHtml =  '<p>この記事への言及はありません。</p><br/>';

  if(isImpression) {
  var header = '<h3>この記事への感想<a href="http://blog.hatena.ne.jp/my/edit?title=' + titleName +'の感想&body=[' + document.location.href + ':embed]" target="_blank" style="float:right">＞＞感想を書く</a></h3>'
  var defaultHtml =  '<p>この記事への感想はありません。</p><br/>';

  }

  var fetchNum = 10;

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

