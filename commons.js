function createHtml(container, headerHtml, resultEntries, defaultHtml,fetchNum) {
  var resultHtml = "";
  if (resultEntries.length == 0) {
    if(defaultHtml != null) {
      resultHtml = defaultHtml;
    } 
  } else {
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

function createOwnHtml(container, headerHtml, resultEntries, defaultHtml,fetchNum) {
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
  console.log(resultEntries); 
  var resultHtml = "";
  if (resultEntries.length == 0) {
    if(defaultHtml != null) {
      resultHtml = defaultHtml;
    } 
  } else {
    resultEntries.shuffle();
    for(var x = 0; x < resultEntries.length && x < fetchNum; x++) { 
      resultHtml += createOwnEmbedFrame(resultEntries[x].link);
    }
  }
  container.innerHTML = headerHtml + resultHtml;
}

function createOwnEmbedFrame (link) {
    var blogURL = getBlogUrl();
    var embedURL = link.replace(blogURL + '/entry/', blogURL + '/embed/');
    var html = '<p><iframe src="'
      + embedURL
      + '" width="100%" height="220px" scrolling="no" '
      + 'frameborder="0" style="margin:3px 0px;">'
    return html;
}

function getBlogUrl() {
  var href = document.location.href;
  var ret = href.replace(/(^http:\/\/[^\/]*).*/,"$1");
  return ret;
}

