google.setOnLoadCallback(runBookmark);
google.load("feeds", "1");

function runBookmark() {
  var entryUrl = document.location.href;
  var userScript = document.createElement('script');
  userScript.type="text/javascript";
  userScript.src='http://b.hatena.ne.jp/entry/jsonlite/?url='
          + encodeURIComponent(entryUrl)
          + '&callback=callbackBookmark';
  document.getElementsByTagName('head')[0].appendChild(userScript);
}

function callbackBookmark(bookmark) {
  console.log(bookmark);
  if(bookmark) {
    var eid = bookmark.eid;
    if(eid == '') {
      return;
    }
    var relUrl = 'http://b.hatena.ne.jp/fragments/entry.reldiary?'
               + '&key=fragments%2Fentry.reldiary.html%3Aeid%3D'
               + eid + '&ttl=1800&keys=eid%3D' + eid;
    relTrackbackRssUrl = 'http://pipes.yahoo.com/pipes/pipe.run?'
               + '_id=da86ac3f59f0ff92c537c0d8d5952b94&_render=rss'
               + '&URL=' + encodeURIComponent(relUrl)
               + '&blog=' + getBlogUrl();
    console.log(relTrackbackRssUrl);
    runTrackBack(relTrackbackRssUrl); 
  }
}

function runTrackBack(relTrackbackRssUrl) { 
  var header = '<h3>Ç±ÇÃãLéñÇ÷ÇÃåæãy<a href="http://blog.hatena.ne.jp/my/edit?title=ÉÇÉmê\Ç∑&body=[' + document.locate.href + ':embed]" target="_blank" style="float:right">åæãyÇ∑ÇÈ</a></h3>'
  var defaultHtml =  "<p>Ç±ÇÃãLéñÇ÷ÇÃåæãyÇÕÇ†ÇËÇ‹ÇπÇÒÅB</p><br/>";

  var feed = new google.feeds.Feed(relTrackbackRssUrl);
  
  feed.setNumEntries(10);
  feed.load(function(result) {
    var r = new Array();
    if (!result.error) {
      r = result.feed.entries;
    } 
    createHtml(trackback_entry, header, r, defaultHtml, 10);
  }); 
}

function createHtml(container, headerHtml, resultEntries, defaultHtml,fetchNum) {
  Array.prototype.shuffle = function() {
    var i = this.length;
    while(i){
      var j = Math.floor(Math.random()*i);
      var t = this[--i];
      this[i] = this[j];
      this[j] = t;
    }
    return this;
  }
  
  var resultHtml = "";
  if (resultEntries.length == 0) {
    if(defaultUrl != null) {
      resultHtml = defaultHtml;
    } 
  } else {
    resultEntries.shuffle();
    for(var x = 0; x < resultEntries.length && x < fetchNum; x++) { 
      resultHtml += createEmbedFrame(resultEntries[x].link);
    }
  }
  container.innerHTML = headerHtml + resultHtml;
}

function createEmbedFrame(link) {
    var embedURL = "http://hatenablog.com/embed?url=" 
      + encodeURI(link);
    var html = '<p><iframe src="'
      + embedURL
      + '" width="100%" height="160px" scrolling="no" '
      + 'frameborder="0" style="margin:3px 0px;">'
      + '</iframe></p>';
    return html;
}

function getBlogUrl() {
  var href = document.location.href;
  var ret = href.replace(/(^http:\/\/[^\/]*).*/,"$1");
  return ret;
}

