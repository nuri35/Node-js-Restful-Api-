//mıddlewearı neydı ıstek gelıyor ve response oluyor bu ıkı şey arasındakı yapı bende userla ılgılı ornegın ıslemı yapıp response yollamadan once catchlerı yakaladıgımda her catch altına yazmıcamda burdakı mıddlewearde tutup verı tabanına ekleyebılrıım. user.js de ornegın delete ıslemı ıcın ele alalım

const errcatchım = (err,req,res,next)=>{
  
    res.status(err.status).json({
        // hatakodu:err.hatakodu,http error modulunu kulladnıgmız ıcın yorum satırına aldım
        err:err.status,
        sonuc:err.message//err de bursuur alan var message alanını kullandık
    })//RES.JSON NEDEN DEDIK KULLANCIYA JSON OLARAK VERICEZ ONUN IICN . ıstersen bunu hata modelı olsuturp verıtabnaında log olarakda tutabırız
    

    //ıstersek burda yakaladıgımız sadece catche ugrayan hatalar ıcın yanı ham hatalar ıcın burda ornegın hoca ıdyı guncellemek ıstedıgınde hata aldı koduda 66 ımıs oyle bır hata ıcın ozellestırme yapılabılır ben dırek ne hatası verıyorsa ham seklınde burda gosterdım ayrıca kendımde throw ıle hatalar belrıelyıp catche yolladıklarımda var onlarda ayrı.

    //ham hataları hanı 1.parametre olarka   next(createError(400,err)) 400 dedım ama belkı serverdan kaynaklı farklı hatalarda cıkabılır burda onun ıcın ozellestırme yapabılrız  ornegın hatanın code:1100 ıse ıste su server hatası vs dedırtebırlız 

  



}

module.exports = errcatchım;

//pekı burda aynı router dosyalarında oldugu gıbı neden router kullanmadım  routera clıck yaptıgmızda  This is a built-in middleware function in Express. It parses incoming request query parameters. yazyor yanı  gelen ısteklerı parse  eder dıyor  pekı benım bu durumda  ortada  bır ıstek varmı ynaı ılk ıstegımı alıyorum hayır  gelen ıstekten sonra yonlendırılen mıddlewearım yanı bura calsıyorsa bır ıstek onceden  bıryerlerrde kullanılmıs  mesela index.jsde routeruser dosyası  rotayı karsıladıgı ıcın  router modulunu kullandık veya expressı kullandık  ama burda herhangı bır gelen ıstek yok  userrotasının ıcnde catchde bır mıddleweare gecme var next dıyerek  onuda ındex.jsde olusturduk ve burda gelen ıstek yok  burası sadece rotaların next dıyerek mesajı ıelttıgı alt ,orta katman ondan dolayı bu sekılde yapabılrız en son bu fonksıyon ıcınde res.json dıyerek responsu sonlandırcam

//yanı aslıdna bır ıstek var bunu router level ıle yapıyoruz orda bır ıstegı belırlıyor o ıstekle ılgılı ıslemlerı yapmadan oncede farklı mıddlewerlaraa yonlendırıyorum 



