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
  /* 指定月の最初の更新日のスクリーンキャプチャを表示 */
  var a = document.querySelector('#image-calendar-url');
  if(a == null) {
    setTimeout("transformNotify();", 500);
    return;
  }
  a.href = $('.calendar-day a').attr('href');
  a.rel = 'nofollow';
  a.title = $('.calendar-day a').find('span').attr('title');

  var img = document.querySelector('#image-calendar');
  img.src = 'http://capture.heartrails.com/300x250/shadow?' + a.href;
  img.alt = a.title;

  /* 枠線埋め */
  var table = document.querySelector('.js-archive-module-calendar-container table');   
  if(table != null) {
      var tr = table.rows[table.rows.length - 1];
      for(var i = tr.cells.length; i < 7; i++) {
        var td = document.createElement('td');
        td.className = 'calendar-day';
        tr.appendChild(td);
      }
  }

  /* 日付0埋め */
  var d = document.querySelectorAll('.calendar-day span');
  for (var i = 0; i < d.length; i++) {
    if(d[i].innerText.match(/^[0-9]$/)) {
      d[i].innerText = '0' + d[i].innerText;
    }
  }
 
  /* 更新日専用クラス作成 */
  var ed = document.querySelectorAll('.calendar-day a');
  for (var i = 0; i < ed.length; i++) {
    ed[i].parentNode.className += ' calendar-day-entry'
  }
 
  /* 更新日用マウスオーバーイベント */
  $(function() {
    $(".calendar-day-entry").hover(function(e) {
	/* 選択した日付のスクリーンキャプチャ表示 */
        var a = document.querySelector('#image-calendar-url');
	a.href = $(this).find('a').attr("href");
	a.title = $(this).find('span').attr("title");

        var img = document.querySelector('#image-calendar');
	img.src = 'http://capture.heartrails.com/300x250/shadow?' + a.href;
	img.alt = a.title;
      }, function(e) { } );
  });
}

