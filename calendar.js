google.load("jquery", "1.7.1");
google.setOnLoadCallback(addTransformCalendar);

function transformCalendar() {
  var d = document.querySelectorAll('.calendar-day span');
  for (var i = 0; i < d.length; i++) {
    if(d[i].innerText.match(/^[0-9]$/)) {
      d[i].innerText = '0' + d[i].innerText;
    }
  }
  
  var ed = document.querySelectorAll('.calendar-day a');
  for (var i = 0; i < ed.length; i++) {
    ed[i].parentNode.className += ' calendar-day-entry'
  }

  var table = document.querySelector('.js-archive-module-calendar-container table');   
  if(table != null) {
      var tr = table.rows[table.rows.length - 1];
      for(var i = tr.cells.length; i < 7; i++) {
        var td = document.createElement('td');
        td.className = 'calendar-day';
        tr.appendChild(td);
      }
  }
}

function addTransformCalendar() {
  transformCalendar();

  var $selector = $('select.js-archive-module-calendar-selector');
  console.log($selector);
  if($selector == null) {
	  return;
  }

  var updateMyCalendar = function () {
    var $date = $selector.find('option:selected');
    var year = $date.data('year');
    var month = $date.data('month');

    $.ajax({
        type: 'get',
        url: Hatena.Diary.URLGenerator.user_blog_url('/archive_module_calendar'),
        data: { month : month, year: year }
      }).done(function(res) { 
         $('.js-archive-module-calendar-container').html(res);
         transformCalendar();
      });
    };
    $selector.change(function () { updateMyCalendar(); });
      
    var c = document.querySelector('.archive-module-calendar');
    if(c == null) {
      return;
    }

    var input = document.createElement('input');
    input.type = 'button';
    input.value = '移動';
    input.addEventListener('click',function() {
      var $selector = $('select.js-archive-module-calendar-selector');
      var $date = $selector.find('option:selected');
      var year = $date.data('year');
      var month = $date.data('month');
      var url = Hatena.Diary.URLGenerator.user_blog_url('/archive/' + year + '/' + month);
      location.href = url;
    } , false);

    var cb = document.querySelector('.js-archive-module-calendar-container');
    c.insertBefore(input, cb);
    consol.log(c);

    var img = document.createElement('img');
    var url = document.querySelector('.calendar-day-entry a').href;
    img.src = 'http://capture.heartrails.com/300x250/shadow?' + url
    img.id = 'calender-image';

    var sel = document.querySelector('select.js-archive-module-calendar-selector');
    c.insertBefore(img, sel); 
      
    $(function() {
      $(".calendar-day-entry").hover(function(e) {
          var url = $(this).find('a').attr("href");
          var imgurl = 'http://capture.heartrails.com/300x250/shadow?' + url
          $('#image-image').src = imgurl;
      });
    });
  }
}


