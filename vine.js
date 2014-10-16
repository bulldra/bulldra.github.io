function runVineEmbed() {
  var as = document.getElementsByTagName('a');
  for(var i = 0; i < as.length; i++) {
    var a = as[i];
    if(a.href.indexOf('https://vine.co/v/') >= 0) {
      console.log(a);
      var iframe = document.createElement('iframe');
      iframe.class = 'vine-embed';
      iframe.src= a.href + '/embed/simple?related=0'
      iframe.frameborder = 0;

      if(window.innerWidth <= 480) {
        iframe.width = 300;
        iframe.height = 300;
      } else {
        iframe.width = 480;
        iframe.height = 480;
      }
      a.outerHTML = iframe.outerHTML
    }
  }
}
google.setOnLoadCallback(runVineEmbed);

