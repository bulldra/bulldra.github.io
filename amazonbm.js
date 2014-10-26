amazonLink(aid, imageWidth);

function amazonLink(associateid, width) {

  var p = document.getElementById('prodImage');
  var image = "";
  if (p != null) {
    image = p.src;
  } else {
     p = document.querySelector('.imageThumb img');
     if(p != null) {
       image = p.src;
     } else {
       p = document.querySelector('.a-dynamic-image');
       image = p.data-old-hires;;
     }
  }
  console.log(p);
  console.log(image);

  var img = image.replace(/\.[^\.]+\.jpg/,'.SX' + width + '.jpg');
  var url = location.href; 

  var l = document.getElementsByTagName("link");
  for (var i = 0; i < l.length; i++) {
    if (l[i].rel === "canonical") {
      url = l[i].href;
      url = url.replace(/\/[^\/]*\/dp\/(.*)/,'/exec/obidos/ASIN/$1');
      break;
    }
  }

  if(url.indexOf(associateid) != url.length - associateid.length) {
    url += '/' + associateid;
  }

  var text = '<a href="' + url + '" rel="nofollow" target="_blank"><img src="' + img + '" /></a>';
  twotabsearchtextbox.value = text;
  console.log(text);
}

