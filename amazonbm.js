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
  url += '&tag=' + asosiateid;
  var text = '<a href="' + url + '"><img src="' + img + '" /></a>';
  document.write(text);
  console.log(text);
}


