﻿google.load("jquery", "1.7.1");

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

  /* 末尾セル追加 */
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
  if($selector != null) {
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
        } 
      , false);
      var cb = document.querySelector('.js-archive-module-calendar-container');
      c.insertBefore(input, cb);

      var popupObj = $('<span></span>');
	popupObj.css({
		'position' : 'absolute',
		'padding' : '5px',
		'background-color' : '#eaeaea',
		'border' : '1px solid #999999',
		'border-radius' : '3px',
		'max-width' : '500px',
		'z-index' : '9999',
	});
	$('body').prepend(popupObj);
	$(popupObj).hide();



	$(function() {
		$(".calendar-day-entry").hover(function(e) {
			var annotation = $(this).attr("title");
			$(this).removeAttr("title");
			if (annotation != undefined) {
				popupObj.html(annotation)
						.css({
							'top' : e.pageY,
							'left' : e.pageX + 20,
						});
				$(popupObj).show();
			}
		},
		function() {
			if ($(popupObj).text()) {
				$(this).attr("title", $(popupObj).text());
				$(popupObj).hide();
				$(popupObj).html('');
			}
		});

    }
}

google.setOnLoadCallback(addTransformCalendar);

