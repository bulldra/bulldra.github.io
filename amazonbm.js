function amazonLink(asosiateid) {
  var p = document.getElementById('prodImage');
  var img = p.src.replace(/\.[^\.]+\.jpg/,'.SX400.jpg');

  var l = document.getElementsByTagName("link"),
  var url = location.href; 

  for (var i = 0; i < l.length; i++) {
    if (l[i].rel === "canonical") {
      url = l[i];
      break;
    }
  }
  url += '&tag=' + asosiateid;
  document.write('<a href="' + url + '"><img src="' + img + '" /></a>');
}


