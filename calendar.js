google.load("jquery", "1.7.1");

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
  var $selector = $archive.find('.js-archive-module-calendar-selector');
  if(s != null) {
      var updateCalendar = function () {
      var $date = $selector.find('option:selected');
      var year = $date.data('year');
      var month = $date.data('month');

      $.ajax({
         type: 'get',
         url: Hatena.Diary.URLGenerator.user_blog_url('/archive_module_calendar'),
         data: { month : month, year: year }
       }).done(function(res) { // days object
            $archive.find('.js-archive-module-calendar-container').html(res);
            transformCalendar();
          });
       };

       s.addEventListener('change',  updateCalendar, false);
    }
}

google.setOnLoadCallback(addTransformCalendar);

