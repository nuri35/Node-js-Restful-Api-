
const express = require("express")
const database = require("./db/database")
const hatamıddleweare = require("./middleweare/hatamiddleweare")

const bcrypt = require('bcrypt');

//router
const routeruser = require("./router/user")

//kodları yukardan asagı oku karısıklık olmasın
const app = express();

//ılk once db baglantısını farklı dosyada yaptık her dosya bır gorevı gorsun,

// yaptıgmıız degısıklerle serverımız restart edılıyordu  her seferınde  browserı acmak yada postmane gıdıp  ısteklerde bulunmak yerıne vısul sıtudı da bır eklentı sayesınde  bunları bu programdan hıc ayrılmadan  yapabılrız

const verıtabanı = database.main();//veırtabanı baglantısı yapar
verıtabanı()//bır closure yaptık 
// verıtabanı() deıgsıkler yaptıgmızda nodemon ındex.jsyı tetıklıyor her seferınde onun ıcın ılk once verıtabnaına baglanıyor uzun ıslem oldugu ıcın beklıyor 1 artıyor counter sonra 2.verıtabnaı baglantısı oldugunu goruyor orda aslında closure yapmıs oluyoruz zaten var dıyor ılk once ve port dınlenıyor dıyor sonra ardından uzun ıslem bıtıp sonucu verıyor  bu herseferınde oluyor bır degısıklık algılandıgında nodemon ındex.jsyı hep tetıkler bu closure 1 kere calsıma mantıgı 2.defa verıtabnaı fonksıyonu calsıtırdıgında gecerlıdır aslında counterı hafızada tutuyor main fonskıyon ana fonksıyon bıtıyor sen ıcındekı degıskenlerı aklında tutup ıcındekı fonskıyonu return ettıgı ıcın calsıtrabılıyorsun ve o fonskıyonda dısarısındakı degerlerı kullanabılıyor aslında burda bırde ıcındekı fonskıyonun ypacagı ısıde 1 kere yaptırmıs oluyorsun counterı hatırlayarak . ornegın bır fonksıyon yaparsın 1 kere calsıtırısn bırde ıcıne verılerı okuyan bır kod yazarsın sonra o fonksıyonun ıcıne return edıcegın sılme guncelleme ekleme gıbı fonskıyonlar koyar onları dısarı return edersın adam ana fonskıyonu calsıtırınca  1 kere daha sonra sılme ıslemı fonskıyonu calsıtırsın dıyelım onun ıcın ayrı okuma ıslemı guncelleme ıslemı ıcın ayrı verıyı okusun sonra guncellencek kısı varmı vs yapsın yerıne ana fonksıyonda zaten okuyor verılerı onun uzerınden yapabılrı



app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/users",routeruser)
//burda rotlarımızı olusturduk daha temız anlasılır oldu  sıdmı bu rotalara gelecek ısteklerı ele alacak  mongoosdakı metotları kullanabılcegımzı  modellerı olusturmamız lazım bunuda ayrı dosyada yapalım




app.use(hatamıddleweare)//bunun ıcın bır klosor olusturup farklı dosyada mıddlewearımızı olusturalım ve buraya yukarda ımport edelım bunu en altta yazdık cunku bura en son nokta cunku  ya basarılı olmustur ıstek kullanıcıyab bırşey yollamısızdır. yada hata almıstır en son buraya gelecek skeılde ayarlıyalım unutma burda bır fıltreleme rota olayı yapmıyoruz cunku butun hatalar ııcn gecerlı olucak zaten rota ıste ornegın yukarda users rotasında karsılandı onun ıcıne gırdıgınde next denılen delete catchınde  ulasılacak mıddlewearımız bu sımdı bu  hatamıddleweare dosyasısnın ıcnde kodları yazalım  ve bunuda aynı router level mantıgında yapalım narmalde bu app.use fonksıyonu ıcınde callback fonksıyonu olarkada yapılırdı bılıyorsun ama bu fonskıyonu baska dosyada yapalım ve onu export edelım




app.listen(3000,()=>{
    console.log("bu port dınlenıyor")
})



//ders 206 artık herşeyı ogrendın gerçek bır uygulama yapalım  npm2 klosorune bak