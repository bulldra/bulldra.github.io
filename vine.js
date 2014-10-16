function runVineEmbed(p, min, max) {
  var as = document.querySelectorAll('a');
  console.log(as);

  for(var i = 0; i < as.length; i++) {
    var a = as[i];
    if(a.href.indexOf('https://vine.co/v/') >= 0) {
      console.log(a);
      var iframe = document.createElement('iframe');
      iframe.class = 'vine-embed';
      iframe.src= a.href + '/embed/simple?related=0'
      iframe.frameborder = 0;

      if(window.innerWidth <= p) {
        iframe.width = min;
        iframe.height = min;
      } else {
        iframe.width = max;
        iframe.height = max;
      }
      a.outerHTML = iframe.outerHTML
    }
  }
}

