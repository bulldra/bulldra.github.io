google.load("jquery", "1.7.1");
google.setOnLoadCallback(sitemap);

function sitemap(){
   var siteMapUrl = getBlogUrl() + "/"+ 'sitemap.xml';

    $.ajax({ url: siteMapUrl, type:'GET', dataType:'xml', timeout:1000,
        error:function() { console.log(siteMapUrl + "の取得に失敗しました"); }, 
	success:function(xml){
          var $locs = $(xml).find("loc");
	  var loc = $locs.get(Math.floor($locs.size() * Math.random()));
	  console.log(loc);
	  var url = $(loc).text();
          $.ajax({ url:url, type:'GET', dataType:'xml', timeout:1000,
            error:function() { console.log(url + "の取得に失敗しました"); },
            success:function(xml){
              console.log(xml)
	    }
	  });
       }
    });
}

