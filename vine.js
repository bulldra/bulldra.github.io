function runVineEmbed() {
  var as = document.getElementsTagName('a');
  for(var idx in as) {
    if(as[idx].indexOf('https://vine.co/v/') >= 0) {
      var a = as[idx];
      console.log(a);
      a.outerHTML = '<iframe class="vine-embed" src="' + as[i].href + '/embed/simple?related=0" frameborder="0"></iframe>';

    if(window.innerHeight <= 480) {
      e[i].width = 300;
      e[i].height = 300;
    } else {
      e[i].width = 480;
      e[i].height = 480;
    }
  }
	
}
google.setOnLoadCallback(runVineEmbed);

