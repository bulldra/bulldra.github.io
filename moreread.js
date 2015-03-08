function initRecentEntriesMoreRead(l, i) {
   $r = $('.recent-entries-item');
   $r.slice(l).hide();
   $r.slice(0, l).fadeIn('normal');
   
   $('.recent-entries-allow').remove();
   
   var $button = $('<li class="recent-entries-allow">▼MORE</li>');
   $button.on('click', function(){ recentEntriesMoreRead(0, l, i); });
   $('.recent-entries').append($button);
   setTimeout("recentEntriesMoreRead(0," + l + "," + i + ")",10000);
}

function recentEntriesMoreRead(s, l, i) {
   $r = $('.recent-entries-item');
   $r.slice(0, s + i).hide();
   $r.slice(s + l, s + l + i).fadeIn('normal');

   $('.recent-entries-allow').remove();
   var $button = null;   
   if(s + l + i >= $r.length) {
     $button = $('<li class="recent-entries-allow">▲RETURN</li>');
     $button.on('click', function(){ initRecentEntriesMoreRead(l, i); }); 
     setTimeout("initRecentEntriesMoreRead(" + l + ","  + i + ")", 10000);
   } else {
     $button = $('<li class="recent-entries-allow">▼MORE</li>');
     $button.on('click', function(){ recentEntriesMoreRead(s + i, l ,i); });
     setTimeout("recentEntriesMoreRead(" + (s + i) + "," + l + "," + i + ")", 10000);
   }
   $('.recent-entries').append($button);
}
