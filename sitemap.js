google.load("jquery", "1.7.1");

function jumpLastEntry(isNewWindow){
  var func1 = function($locs) { 
    return $locs.get(0);
  };

  var func2 = function($locs) {
    var $locss = $locs.filter(function(){
       var url = $(this).text();
       if(url == getBlogUrl() + '/'|| url == getBlogUrl() + '/about') {
	       return false;
       } else { 
	       return true; 
       }
    });
    return $locss.get(0);
  }
  jumpEntry(func1, func2, isNewWindow);
}

function jumpFirstEntry(isNewWindow){
  var func = function($locs) { 
    return $locs.get($locs.size() - 1);
  };
  jumpEntry(func, func, isNewWindow);
}

function jumpRandomEntry(isNewWindow){
  var func = function($locs) { 
    var $locss = $locs.filter(function(){
       var url = $(this).text();
       if(url == getBlogUrl() + '/' || url == getBlogUrl() + '/about' || url == location.href) {
	       return false;
       } else { 
	       return true; 
       }
    });
    if($locss.size() == 0) {
      return $locs.get(0); 
    } else {
      return $locss.get(Math.floor($locss.size() * Math.random()));
    }
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
        console.log(url);
       $.ajax({ url:url, type:'GET', dataType:'xml', timeout:1000,
         error:function() { console.log(url + "の取得に失敗しました"); },
         success:function(xml){
           var $locs = $(xml).find("loc");
           var loc = func2($locs);
           var url = $(loc).text();
           console.log(url);

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

