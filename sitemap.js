google.load("jquery", "1.7.1");

function jumpFirstEntry(isNewWindow){
  var func = function($locs) { 
    return $locs.get(0);
  };
  jumpEntry(func, func, isNewWindow);
}

function jumpLastEntry(isNewWindow){
  var func = function($locs) { 
    return $locs.get($locs.size() - 1);
  };
  jumpEntry(func, func, isNewWindow);
}

function jumpRandomEntry(isNewWindow){
  var func = function($locs) { 
    return $locs.get(Math.floor($locs.size() * Math.random()));
  };
  jumpEntry(func, func, isNewWindow);
}

function jumpEntry(func1, func2, isNewWindow){
   var siteMapUrl = getBlogUrl() + "/"+ 'sitemap.xml';
   $.ajax({ url: siteMapUrl, type:'GET', dataType:'xml', timeout:1000,
     error:function() { console.log(siteMapUrl + "の取得に失敗しました"); }, 
     success:function(xml){
       var $locs = $(xml).find("loc");
       var loc = func1($locs);
       var url = $(loc).text();
       $.ajax({ url:url, type:'GET', dataType:'xml', timeout:1000,
         error:function() { console.log(url + "の取得に失敗しました"); },
         success:function(xml){
           var $locs = $(xml).find("loc");
           var loc = func2($locs);
           var url = $(loc).text();

	   if(isNewWindow == null || isNewWindow === undefined || isNewWindow == false) {
             location.href = url;
	   }else {
	     window.open(url);
	   }
         }
       });
     }
  });
}

