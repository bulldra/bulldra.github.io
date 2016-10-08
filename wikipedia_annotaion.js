function execWikipediaAnnotation() {
  var word_set = new Set();
  var segmenter = new TinySegmenter(); 
  var objs = document.getElementsByClassName('wikipedia_annotaion');
   if(objs == null || objs.length == 0) {
     return;
   }

  for(var a in objs) { 
    var segs = segmenter.segment(objs[a].innerText);
     for(var b in segs) {
       if(segs[b].length >= 2) {
         word_set.add(segs[b]);
       }
     }
  }

  console.log(word_set);
  for (let word of word_set) {
    callWikipediaApi(word);
  }
}

function callWikipediaApi(q) {
  var api = '//wikipedia.simpleapi.net/api?output=jsonp&callback=callbackWikipediaApi&q=' 
      + encodeURI(q);
  console.log(api);

  var s = document.createElement("script");
  s.src = api;
  document.getElementsByTagName("script")[0].parentNode.appendChild(s); 
}

function callbackWikipediaApi(args) {
  if(args == null || args.length == 0 || args[0] == null) {
    console.log('args is null');
    return;
  }
  var r = args[0];

  var objs = document.getElementsByClassName('wikipedia_annotaion');
  if(objs == null || objs.length == 0) {
    console.log('objs is null');
    return;
  }
  console.log(objs)
  for(var a in objs) {
    console.log(objs[a].innerHTML);
    var text = objs[a].innerHTML;
    if(text == null || text.length <= 1) {
      console.log('text is null');
      continue;
    }
    var ptn = new RegExp('/' + r.title +  '/g');
    objs[a].innerHTML = text.replace(ptn, r.title + '<sup title="' + r.body + '">*</sup>');
    console.log(objs[a].innerHTML);
  }
}
