google.load("feeds", "1");

function runCategory() {
  var header = '<h3>カテゴリー「%CATEGROY%」の記事</h3>';
  var entries = new Array();
  var category_elements = document.querySelectorAll('div.categories a');
  var category_element = null;
  if(category_elements != null && category_elements.length > 0) {
    var idx = Math.floor(Math.random() * category_elements.length);
    category_element = category_elements[idx];
  }

  if(category_element !== undefined && category_element != null) {
    var blogUrl = getBlogUrl();
    var categoryName = category_element.href.replace(blogUrl +'/category/','');
    var categoryLink = blogUrl + '/archive/category/' + categoryName 
    var category_title = category_element.text;
    category_title = category_title.replace(/.+-/,"");

    header = header.replace("%CATEGROY%",'<a href="' + categoryLink + '">' 
		    + category_title + '</a>');
    category_relate.innerHTML = header;

    var relRssUrl = 'http://pipes.yahoo.com/pipes/pipe.run?'
	      + 'blog=' + blogUrl
	      + '&category=' + categoryName
              + '&myurl=' + document.location.href
              + '&_id=60ec48592b55d11f71206be81d7c0881'
	      + '&_render=rss'
    console.log(relRssUrl);

    var feed = new google.feeds.Feed(relRssUrl);
    feed.setNumEntries(50);
    feed.load(function(result) {
      if (!result.error) {
        entries = result.feed.entries;
        console.log('categoryEntry.length=' + entries.length);
      } 
      createHtml(category_relate, header, entries, "<p>カテゴリの記事がありません。<br/></p>", 3);
    });
  }
}

google.setOnLoadCallback(runCategory);

