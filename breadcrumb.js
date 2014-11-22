function categoryReplace() {
  var topUrl = getBlogUrl();
  
  var categoryElements = document.querySelectorAll("div.categories a");
  console.log(categoryElements);
  for(var idx = 0; idx < categoryElements.length; idx++) {
    var c = categoryElements[idx];
    if(c.text == null || c.text === undefined) {
      continue;
    } 
    c.href = c.href.replace(topUrl + '/category', topUrl + '/archive/category');
    var es = c.text.split('-');
    if(es.length >= 2) {
      c.innerHTML = es[es.length - 1];
    }
  }
}
 
function writeCategoryBreadCrumb() {
  var topUrl = getBlogUrl();
  var flagMap = new Array();
  var categoryMap = new Array();
  var categoryElements = document.querySelectorAll("div.categories a");
  for(var idx = 0; idx < categoryElements.length; idx++) {
    var c = categoryElements[idx];
    if(c.text == null || c.text === undefined) {
      continue;
    } 
    var key = c.href.replace(topUrl, '');
    flagMap[key] = false;
    categoryMap[key] = c;
  }

  /* 個別エントリじゃない場合はそこで終了 */
  var categoryHTML = document.querySelector("div#breadcrumb");
  if(categoryHTML == null) {
    return;
  }

  var categoryResult = new Array();
  var breadcrumbResult = new Array();

  /* 階層化カテゴリ用 */
  for(var key in flagMap) {
    /* 親カテゴリがある場合のみ処理を実行 */
   
    var es = key.split('-');
    if(es.length >= 2 && categoryMap[es[0]] != null) {
      var pName = es[0];
      categoryResult.push(createCategoryNode(categoryMap, key, pName));
      breadcrumbResult.push(createBreadcrumbHtml(categoryMap, key, pName));
      /* 親も子も使用済みフラグを立てる*/
      flagMap[key] = true;
      flagMap[pName] = true;
    }
  }

  /* 階層化してないカテゴリの場合に処理を実行 */
  for(var key in flagMap) {
    if(flagMap[key] == false) {
      console.log(key);
      categoryResult.push(createCategoryNode(categoryMap, key, null));
      breadcrumbResult.push(createBreadcrumbHtml(categoryMap, key, null));
      /*  使用済みフラグ */
      flagMap[key] = true;
    }
  }

  /* パンくずリスト書き出し */
  if(breadcrumbResult.length > 0 && categoryHTML != null) {
    categoryHTML.innerHTML = breadcrumbResult[0];
    console.log(categoryHTML)
    if(categoryHTML.className == 'notHierarchy') {
	    return;
    }
  
    var categories = document.querySelector("div.categories");
    if(categoryResult.length > 0 && categories != null) { 
      categories.innerHTML = '';
      for(var idx = 0; idx < categoryResult.length; idx++) {
      　if(categories !=null && categoryResult[idx] != null) {
          categories.appendChild(categoryResult[idx]);
          if(idx < categoryResult.length -1) {
            categories.appendChild(document.createElement('br'));
          }
    　  }
      }
    }
  }
}

google.setOnLoadCallback(categoryReplace);
google.setOnLoadCallback(writeCategoryBreadCrumb);


/* カテゴリモジュールでルートカテゴリのみ表示 */
function categoryHierarchyModule() {
  var rootCategories = new Array();
  var childCategories = new Array();
  var categoryModule = document.querySelector("div.hatena-module-category div.hatena-module-body");

  if(categoryModule != null) {
    var cateogryList = categoryModule.querySelectorAll("ul li a");
    for(var idx in cateogryList) {
      if(cateogryList[idx] == null || cateogryList[idx].text == null) {
          continue;
      }
      var es = cateogryList[idx].text.split("-");
      if(es.length >= 2) {
        cateogryList[idx].text = es[es.length - 1];
        var key = es[0].replace(/\s+/g, "");
        if(childCategories[key] == null) {
          childCategories[key] = new Array();
        }
        childCategories[key].push(cateogryList[idx]);
      } else {
        var key = cateogryList[idx].text.replace(/\s+/g, "");
        key = key.replace(/\([0-9]+\)$/,"");
        rootCategories[key] = cateogryList[idx];
      }
    }

    var html = '<ul class="hatena-urllist">';
    for(var key in rootCategories) {
      if(!(rootCategories[key].outerHTML === void 0)) {
        html += '<li>' + rootCategories[key].outerHTML + '</li> ';
      }
    }
    categoryModule.innerHTML= html;
  }
}

function appendCategoryLink(span, title, url) {
  var a = document.createElement('a');
  a.innerHTML = title;
  a.href = url;
  a.itemprop="url";
  span.appendChild(a);
}

function createBreadcrumbHtml(categoryMap, key, pName) {
  var topUrl = getBlogUrl();

  var html = "<div itemscope='' itemtype='http://data-vocabulary.org/Breadcrumb'>";
  html += "<a href='" + topUrl + "' itemprop='url'>";
  html += "<span itemprop='title'>TOP</span>";
  html += "</a>";
  html += "</div>";

  if(pName != null) {
    html += " > ";
    html += "<div itemscope='' itemtype='http://data-vocabulary.org/Breadcrumb'>";
    html += "<a href='" + categoryMap[pName].href + "' itemprop='url'>";
    html += "<span itemprop = 'title'>" + categoryMap[pName].text + "</span>";
    html += "</a>";
    html += "</div>";
  }

  html += " > ";
  html += "<div itemscope='' itemtype='http://data-vocabulary.org/Breadcrumb'>";
  html += "<a href='" + categoryMap[key].href + "' itemprop='url'>";
  html += "<span itemprop='title'>" + categoryMap[key].text + "</span>";
  html += "</a>";
  html += "</div>";
      
  var title = document.querySelector("h1.entry-title a");
  if(title != null){
      html += " > ";
      html += "<div itemscope='' itemtype='http://data-vocabulary.org/Breadcrumb'>";
      html += "<span itemprop='title'>" + title.text + "</span>";
      html += "</div>";
  }
  return html;
}

function createCategoryNode(categoryMap, key, pName) {
  var topUrl = getBlogUrl();
  console.log(key);

  var categorySpan =  document.createElement("span");
  appendCategoryLink(categorySpan, "TOP", topUrl);

  if(pName != null) {
    categorySpan.appendChild(document.createTextNode(" > "));
    categorySpan.appendChild(categoryMap[pName].cloneNode(true));
  }
  categorySpan.appendChild(document.createTextNode(" > "));
  categorySpan.appendChild(categoryMap[key].cloneNode(true));

  return categorySpan;
}


