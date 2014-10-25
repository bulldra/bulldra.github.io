function amazonLink(asosiateid, width) {
  var p = document.getElementById('prodImage');
  var img = p.src.replace(/\.[^\.]+\.jpg/,'.SX' + width + '.jpg');

  var l = document.getElementsByTagName("link");
  var url = location.href; 

  for (var i = 0; i < l.length; i++) {
    if (l[i].rel === "canonical") {
      url = l[i];
      break;
    }
  }
  url += '&tag=' + asosiateid;
  var text = '<a href="' + url + '"><img src="' + img + '" /></a>';
  document.write(text);
  console.log(text);
}


