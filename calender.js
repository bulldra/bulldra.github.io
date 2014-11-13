function transformCalender() {
  var table = document.querySelector('.js-archive-module-calendar-container table');   
  if(table != null) {
      var tr = table.rows[table.rows.length - 1];
      console.log(tr);
      console.log(tr.cells.length);
      
      for(var i = tr.cells.length - 1; i < 7; i++) {
        var td = document.createElement('td');
        td.className = 'calendar-day';
        tr.appendChild(td);
      }
  }
}

google.setOnLoadCallback(transformCalender);

