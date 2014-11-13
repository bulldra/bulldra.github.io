function transformCalender() {
  var ws = document.querySelectorAll('.archive-module-calendar-week');   
  if(ws != null) {
      var w = ws[ws.length - 1];
      console.log(w.length);
/*
      for(var i = c.length - 1; i <= 7; i++) {
        var td = document.createElement('td');
        td.className = 'calendar-day';
        w.appendChild(td);
      }
      */
  }
}

google.setOnLoadCallback(transformCalender);

