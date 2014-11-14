google.load("jquery", "1.7.1");
google.setOnLoadCallback(initTransformCalendar);

window.addEventListener("DOMContentLoaded", function(){
  setTimeout("transformNotify();", 200);
}, false);

function transformNotify(){
  // オブザーバインスタンスを作成
  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){ transformCalendar(); });
  });

  // オブザーバの設定
  var config = { attributes: true, childList: true, characterData: true};

  // 対象ノードを選択
  var cb = document.querySelector('.js-archive-module-calendar-container');

  // 対象ノードとオブザーバの設定を渡す
  observer.observe(cb, config);
}

function initTransformCalendar() {
  var c = document.querySelector('.archive-module-calendar');
  if(c == null) {
    return;
  }
  
  var cb = document.querySelector('.js-archive-module-calendar-container');
  var sel = document.querySelector('select.js-archive-module-calendar-selector');
  var img = document.createElement('img');
  var a = document.createElement('a');
  
  img.id = 'image-calendar';
  a.id = 'image-calendar-url';

  var input = document.createElement('input');
  input.type = 'button';
  input.value = '一覧表示';
  input.addEventListener('click',function() {
    var $selector = $('select.js-archive-module-calendar-selector');
    var $date = $selector.find('option:selected');
    var year = $date.data('year');
    var month = $date.data('month');
    var url = Hatena.Diary.URLGenerator.user_blog_url('/archive/' + year + '/' + month);
    location.href = url;
  }, false);

  c.insertBefore(input, cb);
  c.insertBefore(a, sel); 
  a.appendChild(img);

  var $selector = $('select.js-archive-module-calendar-selector');
  $selector.change(function () { transformNotify(); });
  transformCalendar();
}

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

  /* 現在のURLのスクリーンキャプチャ作成 */
  var img = document.querySelector('#image-calendar');
  var a = document.querySelector('#image-calendar-url');
  a.href = location.href;
  img.src = 'http://capture.heartrails.com/300x250/shadow?' + a.href;
  
  $(function() {
    $(".calendar-day-entry").hover(function(e) {
        var url = $(this).find('a').attr("href");

        var a = document.querySelector('#image-calendar-url');
	a.href = url;

        var img = document.querySelector('#image-calendar');
	img.src = 'http://capture.heartrails.com/300x250/shadow?' + url;
      }, function(e) { } );
  });
}

