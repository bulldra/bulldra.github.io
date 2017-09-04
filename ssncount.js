function appendFbShareCount(clazz, permalink) {
  $.ajax({
    url: 'https://graph.facebook.com/?id=' + permalink,
    dataType: 'jsonp' ,
    success:function(obj) {
      var count = 0 ;
	  if( obj.shares ) {
	    count = obj.shares ;
	  }
	  $(clazz).append('(' + count + ')');
    },
    error:function() { $(clazz).append('0'); },
    complete:function() { return false ; }
  });
}

function appendHbShareCount(clazz, permalink) {
  $.ajax({
    url: 'http://api.b.st-hatena.com/entry.count?url=' + permalink,
    dataType: 'jsonp' ,
    success:function(obj) {
      var count = 0;
      if(obj) {
        count = obj;
      }
      $(clazz).append('(' + count + ')');
    },
    error:function() { $(clazz).append('(0)'); },
    complete:function() { return false ; }
  });
}

function appendTwShareCount(clazz, permalink) {
  $.ajax({
    url: 'http://jsoon.digitiminimi.com/twitter/count.json?url=' + permalink,
    dataType: 'jsonp' ,
    success:function(obj)	{
      var count = 0 ;
      if(obj.count) {
	    count = obj.count ;
	  }
	  $(clazz).append('(' + count + ')') ;
    },
    error:function() { $(clazz).append('(0)'); } ,
    complete:function() { return false ; }
  }) ;
}
