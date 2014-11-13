﻿function transformCalender() {

  var d = document.querySelectorAll('.calendar-day span');
  for (var i = 0; i < d.length; i++) {
    if(d[i].innerText.match(/^[0-9]$/)) {
      d[i].innerText = '0' + d[i].innerText;
    }
  }
  
  var ed = document.querySelectorAll('.calendar-day a');
  console.log(ed);
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

function addSelectCalenderCategory() {
  var c = document.querySelector('.archive-module-calendar');
  if(c != null) {

  }
}

google.setOnLoadCallback(transformCalender);
google.setOnLoadCallback(addSelectCalenderCategory);
