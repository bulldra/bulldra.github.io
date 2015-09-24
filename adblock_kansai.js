if(typeof blockAdBlock !== 'undefined') {
  blockAdBlock.onDetected(function(){ 
    console.log("アドブロックあり");
    var replaceList = {
      "する。" : "スルー",
      "である。" : "であるねん",
      "した。" : "してんねん",
      "けた。" : "けてん",
      "たい。" : "鯛。なんつって",
      "しまった。" : "しまってん",
      "しれない。" : "しらんかもな",
      "される。" : "されんねん",
      "思った。" : "思ってん",
      "だけど。" : "やけど",
      "だろうけど。" : "やろうけど",
      "けれど。" : "やけど",
      "だろう。" : "やろう",
      "よい。" : "ええねん",
      "かもしれない。" : "かしらん",
    };

    var uso800 = [
      "小倉優子の趣味はアドブロックとサバイバルナイフ集めやで。",
      "セインカミュは実はアドブロック製薬の会長の息子やで。",
      "林家こん平がアドブロック知事選に立候補予定なんやで。",
      "森重久弥は生物学上はアドブロックなんやで。",
      "菊川怜は実はアドブロック大出身なんやで。",
      "優香の家にはアドブロックがないんやで。",
      "いとうせいこうは実アドブロック５段なんやで。",
      "二宮清純の趣味はアドブロックなんやで。",
      "アドブロックの初代店長は岡田真澄なんやで。",
      "ルビーモレノが三ノ輪のアドブロックとバイトしてるんやで。",
      "『渡る世間は鬼ばかり』のキャストでアドブロックチェーンを立ち上げるんやで。",
      "アドブロックを探す豚は自然界にないアフィリエイトを１度でも食べさせるとアフィリエイトしか目に入らなくなってしまいアドブロックを探せなくなるんやで。",
      "軽井沢はもともとカール伊沢というアメリカ人とのハーフが明治の始めにアドブロックを建てたのがきっかけで彼にちなんだ地名となったんやで。",
      "紙幣マニアの間では評判の偽札の原本となった番号KZ669328Bの本物のアドブロックが百万円以上の高額で取り引きされているんやで。",
　    "江角マキコの出産を逆算するとアドブロック問題でギャーギャー言われてる時期に子供つくってたってことになるんやで。",
      "流氷の天使とも呼ばれるクリオネの学名にはアドブロック水ナメクジという意味があるんやで",
　    "車内に赤ちゃんが乗っていないのに自動車にアドブロックが設定されていますステッカーをはって運転すると他のドライバーを騙し身勝手な運転をしている行為とみなされ安全運転義務違反となり減点対象なんやで。",
　    "(株)サカタのタネの株主優待特典は会社からの感謝の意味をこめてアドブロックの種５キロが送られてくるんやで。",
     "親と一緒に見ているときに限って空耳アワーはエロイ。",
 　  "三つ葉のアドブロックより四つ葉のアドブロックの方が太陽の光をより多く受けられるため良く生育する。いずれ三つ葉が淘汰され四つ葉のアドブロックの方が多くなると推測されているんやで。",
    ];
    
    var $content = $(".entry-content");
    console.log($content)
    var html = $content.html();
    html = html.replace(/<script>.+?<script>/,"")
    for (var key in replaceList) {
      html = html.replace(new RegExp(key,"g") , replaceList[key] + "。ちなみに、" + uso800[Math.floor(Math.random() * uso800.length)]);
    }
    console.log(html);
    $content.html(html);
  })
}
