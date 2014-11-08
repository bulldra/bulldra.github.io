function addAdsenseArchive(client, headSlot, footSlot, pr)  {
  var es = document.querySelector('.archive-entries');
  var style = "display:inline-block;";
  
  if(es == null) {
       es = document.querySelector('.entry-list');
  }

  if(es == null) {
       if(isAboutPage()) {
            var ss = document.querySelectorAll('.section');
            if (ss != null && ss.length >= 2) {
              es = ss[1];
              es.setAttribute('style','min-width:320px;');
              
              var dd = document.querySelectorAll('dd');
              for(var i=0; i<dd.length; i++) {
                   dd[i].setAttribute('style','margin-left:20px;margin-right:20px;');
              }
              
              var dt = document.querySelectorAll('dt');
              for(var i=0; i<dt.length; i++) {
                   dt[i].setAttribute('style','margin-left:10px;margin-right:10px;');
              }

             } else {
               es = document.querySelector('.entry-content');
             }
       }
  }
 
  if(es == null) {
       return;
  }

  var script = document.createElement('script');
  script.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

  var className = 'archive_adslot';
  var prClassName = 'archive_pr';

  es.insertBefore(createIns('adsbygoogle ' + className, style, client, headSlot), es.firstChild);
  es.insertBefore(createPrDiv(pr, prClassName), es.firstChild);
  es.insertBefore(script, es.firstChild);
  (adsbygoogle = window.adsbygoogle || []).push({});
  
  es.appendChild(createPrDiv(pr, prClassName));
  es.appendChild(createIns('adsbygoogle ' + className, style, client, footSlot));
  (adsbygoogle = window.adsbygoogle || []).push({});
}

function createIns(className, style, client, slot) {
  var ins = document.createElement('ins');
  ins.setAttribute('class', className);
  ins.setAttribute('style', style);
  ins.setAttribute('data-ad-client', client);
  ins.setAttribute('data-ad-slot', slot);
  return ins;
}

function createPrDiv(pr, className){
  var s = document.createElement('div');
  s.setAttribute('class', className);
  s.innerText = pr;
  return s;
}

