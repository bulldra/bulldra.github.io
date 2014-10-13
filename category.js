google.load("feeds", "1");

function runCategory() {
  var header = '<h3>カテゴリー「%CATEGROY%」の記事</h3>';
  var entries = new Array();
  var categoryElements = document.querySelectorAll('div.categories a');

  var categoryElement = null;
  if (categoryElements != null && categoryElements.length > 0) {
    var rootCategoryElements = new Array();
    for (var idx = 0; idx < categoryElements.length; idx++) {
      if (categoryElements[idx].href.indexOf('-') < 0) {
        rootCategoryElements.push(categoryElements[idx]);
      }
    }
    var idx = Math.floor(Math.random() * rootCategoryElements.length);
    categoryElement = rootCategoryElements[idx];
  }

  if(categoryElement !== undefined && categoryElement != null) {
    var blogUrl = getBlogUrl();
    var categoryName = categoryElement.href.replace(blogUrl +'/category/','');
    var categoryLink = blogUrl + '/archive/category/' + categoryName 
    var category_title = categoryElement.text;
    category_title = category_title.replace(/.+-/,"");

    header = header.replace("%CATEGROY%",'<a href="' + categoryLink + '">' 
		    + category_title + '</a>');
    category_relate.innerHTML = header;
    var relRssUrl = blogUrl + '/rss/category/' + categoryName;
    console.log(relRssUrl);

    var feed = new google.feeds.Feed(relRssUrl);
    feed.setNumEntries(50);
    feed.load(function(result) {
      if (!result.error) {
        entries = result.feed.entries;
        entries = removeThisEntry(entries);
        console.log('categoryEntry.length=' + entries.length);
      } 
      createHtml(category_relate, header, entries, "<p>カテゴリの記事がありません。<br/></p>", 3);
    });
  }
}

google.setOnLoadCallback(runCategory);

