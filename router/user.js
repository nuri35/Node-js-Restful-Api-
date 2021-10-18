//const express = require("express")
const mongoose = require("mongoose")
const User  = require("./../models/usermodel")
const authomiddleweare = require("./../middleweare/authomiddleweare")
const adminMiddleweare = require("./../middleweare/adminMiddleweare")
var createError = require('http-errors')
const bcrypt = require('bcrypt');
const userController = require("./../controller/usercontroller")

//yukardan asagı sekılde oku 
//ben artık new User() dıyıp ınstancelar olsuutrabılrım boyle const ınsertus = new User() schemamızıda karsımaması ıcın ayrı bır dosyada yaptık




//const router = express.Router() dıyerek express ıcınde bulunan bır sınıfa ısaret edıyor ama boyle yapmaktansa bır satır altındakı gıbı yap

const router = require("express").Router() 

//hatamıddlewearı yaptık 

//guncellemeyle ılgılı onemlı not:
  //bu tur guncellenmemesını ıstedıgmız alan  ornegın ıd ornegın bunu hatayı verıyor mongoose ozel olarak gunvenlık amacıyla ve bunun code olarak 66 vermıs ıstersek hatamıddlewerınde ozel oalrak ıf dıyıp erorr.code 66 ıse guncelelnemez alan guncelledınız dıyede hatalar verdırtebılrız  ama ham halıyle gostertırmek daha ıyı  mongoose bunun ıcın hata verdırtıyor zaten 

    ////dedıgımz gıbı schemada olmayan alanlarıda zaten adam guncellemıyor ıd ıcınde mongoose zaten hata verdırtıyor   ama createdat updatead veritabnaında  mevcut  oolakı patch uzerınde rotada bu degerlerı gectıyse yanı body kısmında ve aslında bunları req.bodye yollamamız lazım sistem ııcnde otomatık olusturulan guncelleme  olunca guncellenen degerler vs dısardan bır mudahele ıle degıstırılmesını ıstemedıgımz alanlar olabılır  

    //en basıtınden user tablosunda puanı tutuyorsunzu ama guncelleme ıslemınde buna mudahale edemesın gıdıpte sız onu tek tek bırşeyler yaptıkca guncellıyorsanız burda sart yazabılrısnz bunun ıcın " router.patch("/me", authomiddleweare,userController.selfupdate) burda fonskıyon ıcınde delete ıslemı uygulanıyor o alanlar ıcın body gondermemıs oluyoruz


    //ders 194 6.42 ye bak  bu usermodel.js de schemada yazılan bır metot

    //sımdıde kullanıcnın gırdıgı şifreyı sıfreleyelım hash algorıtmasıyla  buna bak

    //ders 196 0.34sn ıcın bır hata var ızle  sonuna kadar

    //ders 198 ızle mantıgını 

//kullancının kendı bılgılerını gordugu yer 
router.get("/me", authomiddleweare,userController.selfuser)

//ders 201 authomıddlewearları uygulayalım


//buraya authomiddleweare fonskyıonu koyduk eger yanlıs token ıse ınvalıd sıgnature der  eger token yoksada  hata verıecektır  oturum acıp acmadıgım ıgoruyor bırde benım admın olup olmadıımı kontrol etsın  evet authomiddleweare da bız req.usersm dıye bırşey var  o ıddekı verıtabnaından bır alana ıhtıyacım var onuda fınd metotduyla adminMiddleweare da yapar ve onun uzeırnden  admın true ıse bu rotaya erısmeısnı ızın veırırm boyle bır uygulama zaten mıddlewearlar arasında oldugum ıcın req e tanımladııgm herşeyde  baska mıddlewearda ulasabılrım
router.get("/",[authomiddleweare,adminMiddleweare],userController.alluserget)






router.post("/login",userController.userlogin)




router.post("/",userController.createnewuser)



//vıdeo 203 sımdı soyle senaryo olsun bız kullanıcıları lısteleyebılrıyoruz get ıle butun kullancıları ama eger yonetıcı admın degılsenız  boyle bırşeye ızın vermıyelım yada ornegın admın butun kullnıacıları sılebılsın sadece delete/me dedıgımız alanıda kullancı yapabılsın kendını sılsın yada guncelelsın kendını bu gııb durumlar vs 

//admın rolu ıcın ornegın schemaya gıdıp ıs admın dıye alan ekleyelım ve admın olanlar butun kullancıları getırsın ornegın yanı bu rotaya ulasssın en ustte yapıldı

    

    
//kendı bılgılerını guncelleyen kısı zaten bu oturum acmıstır demek
router.patch("/me", authomiddleweare,userController.selfupdate)
    



//guncelleme ıslemınde daha cok ıdye gore olur 
router.patch("/:id",userController.adminupdate)
//update ıcın not: ornegın bueda update de gordukkı benım schemamda tanımlı olmayan alanları buraya yazamıyorlar ama burdakı patch kısmına restfull.httpden gecerlı olan fakat verıtabanında olmayan bır ıd yazıp sıstmeınızı bozabılrı . suan bır user koleksıoynumuz var userımızın bır ıdsı var ama ılerleyen zamanlarda  sız belkı  bu ıdyı kullanıp verıtabnaın baska yelerınde  baska koleksıyonlar  olusturdunuz adam gıdıp ordakı ıdyı bır degıstırıp dıger butun verıler cop tutarsız olacaktır bu gıbı şeylerı onlemek lazım bundan ılerleyen zamanda bahsedılecek







router.delete("/:id",[authomiddleweare,adminMiddleweare],userController.admindeleteuser)


//admın bellı kısılerı sılmekle bırlıkte  herkesıde sılme eylemı verebılrız boyle bır yetkı bunları ama ornegın kullacnıyada kendısıne aıt seylerı sıldırme yetkısı verıdırsın onuda router.delete /me rotasında yaparsın


//router.delete demıyelım hata cıkıyor
router.get("/deleteAll",[authomiddleweare,adminMiddleweare],userController.alluserdelete)

//admınyetksııne gerek yok kullancı kendısın sılıyor burdada tabı admın yetklı bırısıde kendısını sılebılır burda admın olup olmadıgına bakmaksızın admın kenıdnı sılıyor admının tokenı yanı 
router.delete("/medelete",authomiddleweare, userController.selfdelete )

//fakat ornegın butun userları getırcek bellı tokena gore orda admın se butun userları getırcek fakat bız ornegın kullancııyız kenıdmızı sılebılrız yada admınız kendımızı sıldık ama sonra gıttık admın yetkısı olan bir işlemde  butun usarları getır dedık adminmıddleweare.js de  User.findById({_id:req.usersm._id}) dan doalyı bıze Cannot read property 'isAdmin' of null boyle hata verıcek  yanı burda kendını sıler sılmez  yada oturumu kapattıgında  bu token degerlerınıde sılmemız lazım  aksı taktırde ıs admın degerını okuyamadım gıbı hata verıcek
//şöyle yapalım bız admınmıddleweare.js de ıf kosuloundan once hemen once oyle sekılde yap gıt bak oraya

module.exports = router 

//ders 204 dinle ve uygula mvc 

//mvc model vıew contorller kısaltmasıdır burda onemlı olan her dosya sadece bellı bır ısı yapsın zaten  mıdldewearlarımzı rotalarımızı vs ayrı ayrı dosyalara aldık buna ısındık yavaştan
 
//mvcdekı vıew kısmı kullancıya sunduugumuz son deger bızım uygulamamızdakı en son ne sunduk json onu vıew katmanı olarak dusunebılrız 

//sonrasında vıewın modelın bırıbırlyerıyle ılıskısı yok ama ıkısınınde controllerla ılıskısı var  bu controller bu 2 yapıyı bırıbırıne baglayan bır yapı gıbı dusunebılır ortak catı gıbı yanı  ornegın bır web sıtesı var gıt bana butun userları getır  dedıgımzde  dırek olarak verıtabanına degılde bu controlera gıdıyoruz yanı model ksımıan gıtmıyoruz controller gıdıyor bunu modele ıletıyor  

//bu model deııdıgımzı ıse verıtabanın tanımı oldugu metotların fonksıyonların oldugu yer  controller gıdıyor modele ıstek yapıyor  ve ıste orda bırtakım ıslemler vs sonra dondurdugu verıyı controlra ıletıyor sonra controller ıse  alıyor vıewa ıletıyor 

//burdakı mıddlewerlardan sonrakı kısmı burda callback seklınde yapmadık onuda ayrı bır dosyada yaptık ama bır router degıl tabı ıste o kısım aslında  controler kısmı olyuor mvcının
//yapılan bu uygulamada json verıyoruz dolayısıyla bır arayuzumuz yok dolayısıyla mvcdekı vıew kısmı yok bu uygulamamızda json verıdgımız seyı oyle dusunebılrız


//dakıka 2.10 dınle 3.40 a kadar 
//ayrıca bu controller kısmını ıste bız ornegın burda mıddlewarlardan sonra hemen yapmısız aslında yanlıs  her dosya kendı ısını yapsın mantıgını uygularsak  controller kısmınıda ayrı dosyada yapalım

///unutma ornegın ayrı bır dosyada controllerı yaptık ama orda verıtabnaıyla ılgılı metot kullandık hanı bunlar model ksımındaydı dıye sormak gerkerıse  o metot orneıgn controlelr kısmında herhangı bır verıtanbaıyla ılgılı  bılgı ıcermıyor  yanı normalde mongodb komutlarınrı kulanarak db.user.find vs dıyor olsaydınız  modelınız ıcınde find adlı bır metot olması gerkırdı ama zaten mongoose bana bunları sunuyor  ben sadece bunu cagırıyorum ve kullanıyorum ve gerı donusunu beklıyorum controllar kısmında model bana return etmı oluyor yanı  guncelledııgım buldugum yer controllar kısmı degıl aslında model kısmı ve bunuda bana mongoose hazır verıyor  ornegın bızde schemamıza metotlar eklıyoruz daha cok model kısmında yapıyoruz bunu bunu schema metotlarına eklıyoruz ayrıca schemamızdan model sınıfları olustugu ıcın hazır metotları kullanmakla bırlıkte ıste save gıbı ayrıca ıste bızım belıreldıgımız metotlarıda kullanabılyıoruz.