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
    if(defaultHtml != null) {
      resultHtml = defaultHtml;
    } 
  } else {
    resultEntries.shuffle();
    for(var x = 0; x < resultEntries.length && x < fetchNum; x++) { 
      resultHtml += createEmbedFrame(resultEntries[x].link);
    }
  }

  if(headerHtml != null) {
    container.innerHTML = headerHtml;
  } else {
    container.innerHTML = '';
  }
  container.innerHTML += resultHtml;
}

function createEmbedFrame(link) {
    if(link == null) {
	    return "";
    }
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
  if(headerHtml != null) {
    container.innerHTML = headerHtml;
  } else {
    container.innerHTML = '';
  }
  container.innerHTML += resultHtml;
}

function createOwnEmbedFrame (link) {
    if(link == null) {
	    console.log('link is null.');
	    return "";
    }
    var blogURL = getBlogUrl();
    var embedURL = link.replace(blogURL + '/entry/', blogURL + '/embed/');
    var html = '<p><iframe src="'
      + embedURL
      + '" width="100%" height="200px" scrolling="no" '
      + 'frameborder="0" style="margin:3px 0px;">'
      + '</iframe></p>';
    return html;
}

function getBlogUrl() {
  var href = document.location.href;
  if(href.lastIndexOf('http', 0) !== 0) {
    href = 'http://www.ikedakana.com';
    console.log("Return test url.");
  }
  var ret = href.replace(/(^http:\/\/[^\/]*).*/,"$1");
  return ret;
}

function removeThisEntry(entries) {
	var ret = new Array();
	var href = location.href;
	for(var i = 0; i < entries.length; i++) {
		if(entries[i].link != href) {
			ret.push(entries[i]);
		}
	}
	console.log(entries.length + ' -> ' + ret.length);

	return ret;
}

