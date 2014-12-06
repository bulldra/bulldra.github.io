function setParallax() {
  var $div = $('<div class="background-parallax"></div>');
  $div.appendTo('body');

  $(window).scroll(function(e){ 
    var scrolled = $(window).scrollTop();
    var $bg = $('.background-parallax');
    $bg.css('top', -(scrolled * 0.1) + 'px');
  });
}
setParallax();


