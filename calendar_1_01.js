google.setOnLoadCallback(initTransformCalendar);

function initTransformCalendar() {
  window.addEventListener("DOMContentLoaded", function(){
    setTimeout("transformNotify();", 200);
  }, false);
  
  var $input = $(' <input type="button" value="一覧表示" />');
  $input.on('click',function() {
    var $selector = $('select.js-archive-module-calendar-selector');
    var $date = $selector.find('option:selected');
    var year = $date.data('year');
    var month = $date.data('month');
    var url = Hatena.Diary.URLGenerator.user_blog_url('/archive/' + year + '/' + month);
    location.href = url;
  }, false);
  
  var $selector = $('select.js-archive-module-calendar-selector');
  $selector.change(function () { transformNotify(); });
  $selector.after($input);

  transformCalendar();
}

function transformNotify(){
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){ transformCalendar(); });
  });
  var config = { attributes: true, childList: true, characterData: true};
  var cb = document.querySelector('.js-archive-module-calendar-container');
  observer.observe(cb, config);
}

function transformCalendar() {
  var table = document.querySelector('.js-archive-module-calendar-container table');   

  if(table != null) {
      var tr = table.rows[table.rows.length - 1];
      for(var i = tr.cells.length; i < 7; i++) {
        var td = document.createElement('td');
        td.className = 'calendar-day';
        tr.appendChild(td);
      }
  }
  
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
}

