google.load("feeds", "1");
runCategory();

function runCategory() {
  //カテゴリヘッダとして表示する文字列（%CATEGROY%　で　カテゴリ名表示）
  var header = '<h3>カテゴリー「%CATEGROY%」の記事</h3>';
  var entries = new Array();
  var category_elements = document.querySelectorAll('div.categories a');
  var category_element = null;
  if(category_elements != null && category_elements.length > 0) {
    var idx = Math.floor(Math.random() * category_elements.length);
    category_element = category_elements[idx];
  }

  if(category_element !== undefined && category_element != null) {
    var category_url = category_element.href.replace('/category','/rss/category');
    var category_title = category_element.text;
    category_title = category_title.replace(/.+-/,"");
    console.log(category_url);

    header = header.replace("%CATEGROY%",'<a href="' + category_element.href.replace('/category/','/archive/category/')  + '">' + category_title + '</a>');
    category_relate.innerHTML = headerTITLE_CATEGORY;

    var relRssUrl = 'http://pipes.yahoo.com/pipes/pipe.run?URL=' 
              + category_url
              + '&MYURL='
    	      + document.location.href
              + '&_id=3d874be1ef642a87c852bd4a097d3f4c&_render=rss'
    console.log(relRssUrl)

    var feed = new google.feeds.Feed(relRssUrl);
    feed.setNumEntries(7);
    feed.load(function(result) {
      if (!result.error) {
        entries = result.feed.entries;
      } 
    });
  } 
  createHtml(category_relate, header, entries, "<p>カテゴリの記事がありません。</p>", 3);
}

