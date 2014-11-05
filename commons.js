function createHtml(container, headerHtml, resultEntries, 
		defaultHtml,fetchNum) {
  createCommonHtml(createEmbedFrame, container, headerHtml, 
		  resultEntries, defaultHtml,fetchNum);
}

function createOwnHtml(container, headerHtml, resultEntries, 
                defaultHtml,fetchNum) {
  createCommonHtml(createOwnEmbedFrame, container, headerHtml, 
		  resultEntries, defaultHtml,fetchNum);
}  

function createCommonHtml(func, container, headerHtml, resultEntries, defaultHtml,fetchNum) {
  var resultHtml = "";
  if (resultEntries.length == 0) {
    if(defaultHtml != null) {
      resultHtml = defaultHtml;
    } 
  } else {
    resultEntries = shuffleArray(resultEntries);
    for(var x = 0; x < resultEntries.length && x < fetchNum; x++) { 
      resultHtml += func(resultEntries[x].link);
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

function shuffleArray(array) {
    var i = array.length;
    while(i){
      var j = Math.floor(Math.random()*i);
      var t = array[--i];
      array[i] = array[j];
      array[j] = t;
    }
    return array;
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

function addLinkProfile(url) {
  var d = document.querySelector('.hatena-module-profile .hatena-module-title');
  if(d != null) {
    var a = document.createElement('a');
    a.innerHTML = d.innerHTML;
    a.href = url;
    d.removeChild(d.firstChild);
    d.appendChild(a);
  }
}

function setEmbedWidth(width) {
  var iframes = document.querySelectorAll('iframe');
  for (var i = 0; i < iframes.length; i++) {
    if(iframes[i] == null || iframes[i].src == null) {
      continue;
    }
    var url = iframes[i].src;
    if(url.match(/http:\/\/.+\/embed[\/\?].*/)) {
      iframes[i].style.maxWidth = width + 'px';  
    }
  }
}


function addLinkHatenaModule(title, href, className) {
  var modules = document.querySelectorAll('.hatena-module-title');
  for(var i = 0; i < modules.length; i++) {
    if(modules[i].innerText == title) {
      modules[i].className += ' '+ className;
      modules[i].innerText = '';
      var a = document.createElement('a');
      a.href = href;
      a.innerText = title; 
      modules[i].appendChild(a);
    }
  }
}

function addAdsenseArchive(client, headSlot, footSlot,className)  {
  var es = document.querySelector('.archive-entries');
  if(es == null) {
	  es = document.querySelector('.entry-list');
  }
  
  if(es == null) {
	  return;
  }
  
  var script = document.createElement('script');
  script.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

  var insHead = createIns("adsbygoogle " + className, client, headSlot);
  var insFoot = createIns("adsbygoogle " + className, client, footSlot);

  console.log(es.firsChild);
 
  if (es.firstChild != null) {
    es.insertBefore(insHead, es.firstChild);
    es.insertBefore(script, es.firstChild);
    es.appendChild(insFoot);
    (adsbygoogle = window.adsbygoogle || []).push({});
    console.log(es);
  } else {
    es.appendChild(script);
    es.appendChild(insHead);
    (adsbygoogle = window.adsbygoogle || []).push({});
    console.log(es);
  }
}

function createIns(className, client, slot) {
  var ins = document.createElement('ins');
  ins.setAttribute('class',className);
  ins.setAttribute('style',"display:inline-block");
  ins.setAttribute('data-ad-client', client);
  ins.setAttribute('data-ad-slot', slot);
  return ins;
}


