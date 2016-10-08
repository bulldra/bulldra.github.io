var wikipediaAnnotationText = [];
function execWikipediaAnnotation() {
  var word_set = new Set();
  var segmenter = new TinySegmenter(); 
  var objs = document.getElementsByClassName('wikipedia_annotaion');
   if(objs == null || objs.length == 0) {
     return;
   }

  for(var a in objs) {
    wikipediaAnnotationText.push(objs[a].innerHTML);
    var segs = segmenter.segment(objs[a].innerText);
     for(var b in segs) {
       if((    segs[b].match(/^[\u30A0-\u30FF]+$/)  && segs[b].length >= 3 )
           || (segs[b].match(/^[\x20-\x7E]+$/)  && segs[b].length >= 3)
           || (segs[b].match(/^[一-龠]+$/)  && segs[b].length >= 2))
      {
         var r = new RegExp('([^\{][^\{])' + segs[b] + '([^\}][^\}])');
         wikipediaAnnotationText[a] = wikipediaAnnotationText[a].replace(r, '$1{{'+ segs[b] + '}}$2');
         word_set.add(segs[b]);         
       }
     }
  }
  console.log(wikipediaAnnotationText);
  console.log(word_set);
  for (let word of word_set) {
    callWikipediaApi(word);
  }

  setTimeout(
    function(){
      console.log('timeout');
      for(var a in wikipediaAnnotationText) {
        var text = wikipediaAnnotationText[a];
        if(text == null || text.length <= 1) {
          console.log('text is null');
          continue;
        }
        var ptn = new RegExp('\{\{([^\}]*)\}\}','g');
        wikipediaAnnotationText[a] = text.replace(ptn,  '$1');
      }
      console.log(wikipediaAnnotationText);
      var objs = document.getElementsByClassName('wikipedia_annotaion');
      if(objs == null || objs.length == 0) {
        return;
      }

      for(var a in objs) {
          objs[a].innerHTML = wikipediaAnnotationText[a];
      }
   }, 1000);
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
    return;
  }
  var r = args[0];
  for(var a in wikipediaAnnotationText) {
    var text = wikipediaAnnotationText[a];
    if(text == null || text.length <= 1) {
      console.log('text is null');
      continue;
    }
    var ptn = new RegExp('\{\{('+r.title + ')\}\}','g');
    var rep = r.title + '<sup title="' + r.body + '"><a href="' + r.url + '">※</a></sup>'
    wikipediaAnnotationText[a] = text.replace(ptn, rep);
  }
}
