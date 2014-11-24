google.load("jquery", "1.7.1");
google.setOnLoadCallback(setParallax);

function setParallax() {
  var $div = $('<div class="background"></div>');
  $div.appendTo('body');

  $(window).scroll(function(e){ 
    var scrolled = $(window).scrollTop();
    var $bg = $('.background');
    $bg.css('top', -(scrolled * 0.1) + 'px');
    console.log($bg.css('top'));
  });
}

