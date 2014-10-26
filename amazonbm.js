﻿amazonLink(aid, imageWidth);

function amazonLink(associateid, width) {

  var p = document.getElementById('prodImage');
  var image = p.src;

  if(p == null) {
	  p = document.querySelector('.imageThumb img');
          image = p.src;
  } 

  if(p == null) {
	  p = document.querySelector('.a-dynamic-image');
          image = p.data-old-hires;;
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

