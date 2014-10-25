amazonLink(aid, imageWidth);

function amazonLink(asosiateid, width) {
  var p = document.getElementById('prodImage');
  var img = p.src.replace(/\.[^\.]+\.jpg/,'.SX' + width + '.jpg');
  var url = location.href; 

  var l = document.getElementsByTagName("link");
  for (var i = 0; i < l.length; i++) {
    if (l[i].rel === "canonical") {
      url = l[i].href;
      break;
    }
  }
  url += '/' + asosiateid;
  var text = '<a href="' + url + '" target="_blank" rel="nofollow"><img src="' + img + '" /></a>';
  twotabsearchtextbox.value = text;
  console.log(text);

}


