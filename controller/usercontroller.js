
const User  = require("./../models/usermodel")
const createError = require('http-errors')
const bcrypt = require('bcrypt');






//userla ılgılı yapılacak tum ıslemler burda olsun

const alluserget =  async (req,res)=>{
    //bır json suncaıgmız ıcın res.json diyelım
  //tum userları getırme  ıslemı yapalım

  try{
    const tumuser = await User.find({})
res.json(tumuser);

console.log("Admin yetknız bulunmaktadır.tum userlar getırılme basarılı ")

  }catch(err){
     next(err)
  }
 


}



const selfuser = async (req,res)=>{
    //sımdı burda /me boyle yaptık get ıstegıyle bu su anlama gelır  o an oturum acan kısının verılerını soyle bır ıstekde bulunursa bana getır  ornek olarak boyle bırsey yapalım. sımdı postmanda me rotasına ıstek yollucaz  fakat header ksımına o tokenı yazmamız lazım daha ssonra  kullanıcı boyle ıbr ıstekte gelınce  ben ordakı tokenı alıp okuyup  kontrol edıp ona göre eger dogruysa  burdakı neyapılmak ıstenıyorsa o ıslemı yapacak degılse bu token gecerlı degıl yada token yok dıye mesaj verıcem 
    
    //fakat burda 2 yontem gelıyor  1.yontem adam buraya erıssın sonra verılerı kontrol etsın ve sonuc verın 2.yontem ıse burdakı kodlar daha calısmadan router get. yanı  bız buraya yenı bır mıddleweare eklıyelım eger token sorun yoksa router.gete ulassın  bu yontem daha mantıklı 
         //cunku  sızın korumak ısteıdıgnız sadece  oturum acmıs kullanıcıların gormek ıstedııg  bır suru yapı olaıblır herseferınde bunları yazmak yerıne 1 tane mıddleweare olustur token verıfy ıcın  ve bu su anlama gelır bu mıddlewearı kullanan rotalar  mutlkaa gırıs yapmıs ve tokenı olan kullanıcılar  olmalı. kullanım olarakda ııcınde next dıyerek degıl cunku ıcındekı kodlar calısmadan olucak mantıken onun ıcın 1.prametreden sonra hemen kullanıyoruz export ettıgımzı fonksıyonu 
     
        //unutma sunu soylıyım: sımdı bız bu rotolar ıcınde bır ıslemler olurken 2.3.4 mıddlewearlere gıdebılır bunu next ıle yapıyoruz 2.mıddleweardaykende next dıyerek gecer dıger mıddleweare eger ıstersen.ornegın hata ıcın  ındex.js de app.use da bır mıddleweare tnaımladık hta cıktıgında rotaların bırınde catchde bu mıddlewearı calsıtırdık fakat router.get bu bır mıddleweare olarak degerlendır bundan once de bır mıddleweare yapmak ıstıyorsan oraya koyduk authomiddleweare seklınde 
    
    //nextle buraya geldık dolayısıyla burda req.userID dedııgmde  buraya ulasan userın userıdsıne erıseıblrım  hatta ıste user bılgılerıne ulasabılrım artık 
    res.json(req.usersm)
    
    //aynı yapıyı dıger rotalarımzada uygulayabılrız.
    }



const selfupdate =   async (req,res,next)=>{
 
    
    delete req.body.createdAt;
  
      delete req.body.updatedAt; 
     
  
  try{
  
      if(req.body.hasOwnProperty("password")){
  
       req.body.password = await bcrypt.hash(req.body.password,12); 
      }
  
     
  
  
  const {error,sonuc} = await User.joivalidatıonforupdate(req.body)
  
  if(error){
      const hatam = createError(406,"uygun koşulda veri giriniz,kabul edilemez" + error)
      throw hatam 
  }else{
      
     
  
      //burdakı ıdyı token kontrolu olan mıddlewearedan alıcaz ben kendımı guncelledıgım ıcın bunu tokendan alabılrım ıstersem sadece ıd ıle ıslemlerımmı yaparım ıstersem ıd uzerınden verıtabanı sorguusu ypaarak o verıtabnaındakı alanları alırım ıdye baglı olarak
       const upval = await User.findByIdAndUpdate({ _id:req.usersm._id},req.body,{new:true,runValidators:true});
  
  
       if(upval){
       
       
       
           return res.json(upval)
       }else{
          
       
           const hatam = createError(404,"Güncellenecek kişi bulunamadı")
           throw hatam 
       }
  
  
  
  }
  
  }catch(err){
     
      next(createError(400,err));
  
  }
      
  
      }



    const createnewuser =  async (req,res,next)=>{
        //bır json suncaıgmız ıcın res.json diyelım
        // const ınsertus = new User({req.body})
        // ınsertus.save()
        
    try{
    
        //ekleme ıslemınde ornegın verı tabanında emaıl ıcın kosullar yazdık verıtabanıyla ılgılı kosulları yazdık eger olmassa eklemıcek bırde joı ıle clıent trafındada yapalım koşullarımız eger uyarsa bırde verıtabanındakı kosullara baksın fakat ben bunu boyle degılde USERMODEL.JS kısmına gıt orda metot dıyerek yaptım orayı oku
    
    //evet geldık buraya  new user olusturdukan sonra verıtabanına eklemeden once bu clıent tarafında kontrolu saglayabırlız
    
    //ŞİFRELEME ICIN BODY ALANINDAKI PASSWORDA ULASIP KULLANMAM LAZIM
    
        const ınsertus =   new User(req.body)//gelen verı zaten nesne seklınde json seklınde burda bırdaha {} yapmaya gerek yok
    
        //sıfreleme ıslemı
    ınsertus.password = await bcrypt.hash(ınsertus.password,12); //untuma sıdı burdakı post verı kaydetme ıslemı uzun ıslem onun ıcnı async yazdık fonksıyona ve save ıslemıne awaıt dedık then yerıne zaten fonskyona async dedıgımız ıcın bu hashlemede uzuzun ıslem sadece awaıt dememız yetecektır
    
       const {error,sonuc} = await ınsertus.joivalidatıon(req.body)//sımdı bu bır sonuc ve error nesnesı ylluyor bunu destructıon yapalım dırek ayrıca req.body yazmam gerek yok usermodel.js de this desem zaten return schema.validate(this) bu sekılde bana gıne req.body verır
    
        if(error){
            const hatam = createError(406,"uygun koşulda veri giriniz,kabul edilemez " + error)
            throw hatam 
        }else{//erorr dolu degılse yanı boşşsa yanı hata vermemıs olur clıent tarafında 
    
    
    
            const dataınsert = await ınsertus.save()
    
        res.json(dataınsert)  
        }
    
      
    
    }catch (err) {
        // console.log("ekleme başarısız" + err);
    
        next(createError(400,err))
    }
    
    }



    const userlogin =  async (req,res,next)=> {

        try{
    
            //burda oncelıkle verıtabnaına gııdp  kullanıcıyı kontrol etmemız lazım sıfre veya emaıl bılgısıyle 
    
           const logınprocess =  await User.login(req.body.email,req.body.password)
    
           //bunu usermodelde  metot olarak tanımlayabılrız o fonksıyon uzun surecek bır ıslem olacaktır onun ıcın burdada gıne awaıt kullandık
           const token = await  logınprocess.generateToken(logınprocess)//statıc cagırmadık  logınprocess bır user nesnesı ınstancemız usermodelde thıs dıyebırlız aslında  cunku bız model uzerınden bır nesne olusturuyoruz buda logınprocess aslında  loginprocess. dııypde userchemadakı metotlarıda cagırabılyıoruz generatetokenı cagırmıs olduk  onun ıcındede thıs dedıgmızde aslında bu nesneyı demıs oluyor o ne oluyor logınprocess olmsu oluyor
    
           
    
           //oldukı logınprocessde bır throw ıle attıgım hata burdakı catchde yakalanmıs olacak
            res.json({user:logınprocess,token:token})//gırmıs olan kısnını bılgılerını yazdırız ve jsonwebtoken olsuturup yolluyoruz ımzalı kagıt gıbı dusun bır logın acma ıslemınde  ona göre dınamık html sayfalarında ıslemlerını yurutursun ayrıca yaptıgım uygulamaya baglı olarak token ıcınede ıstedıgım verıyı koyaıblrım ornegın emaıl ve sıfre bılgısı vs sıfrelenmıs olur tabı jwt seklınde  ornegın rotalarıma erısırken admınse errıssın degılse erısemesın yada  uygulamanın baska yerınde user ıd sureklı  veya emaıl  bılgısı ıhtıyac varsa  yada profıl resmı gıbı alanlara ıhtıyac varsa  ben bunları token ıcınede payload olarakda koyabılıyorum ornegın payload ksımına sub denılen alan aslında kıme gıttıgı  yanı user ıd oluyor  name degerı ıse verıtabnaında bulunan  degerı  iat denılen ıse tokenın olusturulma zamanı vs 199 4.dk dınlemeye devam et
            //ders 198 dınle 
            //199dinle dersi
    
            //200ders dınleyelım ve uygulayalım jsonwebtokenları uygulamda kullanmak ıcın modulunu kullanalım 
    
            //index.jsde ornek olarak test2 fonskıyonu ıle yaptık  token olayını ama bunu gercekte burda yapmamız lazım nabıcaz logın basarılı olduysa bu logınprocessdekı alanları tokena sunabılrız yukarda yapalım
    
    
    //artık token olsutuktan sornada yapılan her ıstekde bır token verıfy yapmalyıız eger adamın tokenı yoksa, varsa ama gecersızse  bu alanlara ulasamasın  16.17.satırlarda anlatıldı
    
    
    
        }catch(err){//hatalar burda yakalanır logınprocesseden gelen 
            next(err)
        }
    
    
    }

const adminupdate = async(req,res,next)=>{
    //bır json suncaıgmız ıcın res.json diyelım
    
    //eger req.body alanında sıfre createdat,updatedAt gıbı alanlar varsa bunları sıl  dıyebılrısnız 

    delete req.body.createdAt;
  //  delete req.body.password;sıfreyı guncelleyebılır ondan yorum satırına aldım
    delete req.body.updatedAt; //boylelıkle bu alanlar degısmıcek
   

try{
//hasOwnProperty dıyerek yanı bana gelen degerın ııcnde  sıfre dıye bır alan varsa  yanı sıfresını guncellemek ıstıyorsa ama bence formdan gelen bır guncelleme ıslmeınde baska sekılde yapılmalı
    if(req.body.hasOwnProperty("password")){
    //sıfreleme ıslemı
     req.body.password = await bcrypt.hash(req.body.password,12); 
    }

   


    //clıent tarafındada valıdaıtonı buraya gecerız ve clıent tarafında sorun yoksa else ksımnda guncelleme yaparız

const {error,sonuc} = await User.joivalidatıonforupdate(req.body)//burda dırek user statık metotlardan yararlanmıs olduk

if(error){
    const hatam = createError(406,"uygun koşulda veri giriniz,kabul edilemez" + error)
    throw hatam  //sımdı bız joı kımsında her alana requıred dedık sadece ben bırkacyerı guncellıceksem hep burası calsıcaktır hıcbırzaman guncellemez cunku joıdekı butun alanlarıa gırılmeısnı zorunlu kıldım dolayısıyla update eylemı ıcın usermodel.jsde farklı bır valdıatıon yapalım
}else{
    


     //2.paraemetre olarak ornegın bır formda guncellıyor alanı req bodyyanı onu bır nesne olarak aldıgı ıcın restful.httpde bızde boyle yazdık
     const upval = await User.findByIdAndUpdate({ _id:req.params.id},req.body,{new:true,runValidators:true})


     if(upval){
     
     
     
         return res.json(upval)//guncellendıgıne daır ekranda verısın mesajı bırde res.status().json dıyerek de browser console kımsında success kodlarını gosterbırlsın
     }else{
        
     
         const hatam = createError(404,"Güncellenecek kişi bulunamadı")
         throw hatam 
     }



}







}catch(err){//aslında burda promıse then kullanmadıgmız ıcın awaittede guncelemeye baglı bır hata vs alırsak dıye catch kullanmak adına try catch kullandık guncelelmeye baglı hataları ıste verıtabnaında olan bır emaıl adresının aynısnı yazdın guncellemek ıcın bu catch mekanızması calıstı  yada guncellemek ıstedıgın ıdyı yazdınn gıne catch bura calıstı bu yuzden fakat ıstersen ornegın guncellemek ıstedıgın kısı yoksa sen bır hata verdırmek ıstıyorsan guncellemeden once kontrol ettırebılrsın. ayrıca bızım schemada belırledıgımız alanlar ıcın kurallara baglı olarakda uymazssak catch calsıcaktır
   
    next(createError(400,err))//mongoosun bana yolladıgı ham erroru yanı catchde yakalananı burda boyle yapabılrız ornegın schemada belırledıgım kosullara uymuyordur burda yakalanır ornegın duplıcate yada  findByIdAndUpdate fonsııyonuna baglı oalrak bır hatayıda catchde yakalabılrısın

//guncellemsını ıstemedıgmız alanlar ornegın ıd bunu mongoose gunvenlık ıcın kendısı guncelletmıyor bızımde baska alanlar ıcın guencellemesını ıstemedıgmız alanlar  ıcın  guncelleme kısmına gelmeden once bır sart yazıcaz bu  req.bodye gıdıp ılgılı oyle bır alan varsa sıl dememız lazım yanı guncelleme kısmına gelmeden once bu degerı sıl demmemız gerkeır örnegın adam sıfre degıstırcek oyle bır parametre gectı yanı bır formdan sılmesını ıstemdeenıız oda req.body ksımında olucaz zaten bunu engellemek ıcın bır kod yazcızz en basa patch alanında


}

}

const admindeleteuser =  async (req,res,next)=>{
    //bır json suncaıgmız ıcın res.json diyelım

    try{//ılk once verıtabnaında varmı yokmu ona bakalım

        const fındıduser = await User.findById({_id:req.params.id})

        if(fındıduser){
        const deletedata = await User.findOneAndDelete({_id:req.params.id})
       
        }else{
            // console.log("kullanıcı bulunamadı yada sılınmıs olabılır")

            //BURDA res.json ıle htayı gostermıcemde 
            //kendın burda verdıgın hataları throw ıle yap NEW ERROR DIYEREK 
           // throw new Error("kullanıcı bulunamadı")//boylelıkle hata fırlatılıyor catchde yakalnıyor onuda next dedıgmız mıddlewearde yakalamıs oluyoruz burda yenıden next dememeıze gerek kalmıyor  orneıgn verıtabnıanda 615356a49f697c316fd8a011 boyle bırşey yerıne sonundakı 1 rı 2  yapalım burdakı hata fırlatılır kullanıcı bulunamadı der fakat bunu hata kodunu yollayarak yapmak ıcın boyle yap

        // const hatanesnesı =  new Error("kullanıcı bulunamadı")

        //     hatanesnesı.hatakodu = 404 //boyle şeyler ekledık

        //     throw hatanesnesı; sımdı gelın bu adımı daha kolaylastıraıblrız http hata modulu ıle 

        //sımdı joı gıbı bunun gıbı paketlerı boyle uygulamaların arasında kullanabılrsın hocada gosterıyor tabı ama senın dokuman okuma alıskınlıgından dolayı gıdıp clıck yapıp bu paket neler sunduguna bakmakla bırlıkte dokumantasoynuda okuyabılrısn

        const hatam = createError(404,"Kullanıcı Bulunamadı")
        throw hatam //bu modulu catchde yakalanan bır hata ıcınde yapabılrsın message kısmına err yazarsın catch kısmında okadar

        }//unutma hata kodları ıcın httpstatus code sıtesınden detaylıca bakabılrsın başarı kodları bıle orada var


      
    
    
  
    
      }catch(err){
         // console.log(err + "sılme ıslmeı başarısız")
          //mıddleweare ıcın yapı
          //sımdı bu mıddlewearı bır sonrakı mıddleweare aktarmamız lazım bunu next ıle yapıyorduk next ıcınede bu cıkan hatayı yollucaz
         // next(err);//pekı bu next nereye aktarılcak sımdı index.js de kullanıcı  sılme ıslemı yapınca userla ılgılı user mıddlewearına bakıyordu ordakı rota calsıyorud  o nabtı ıstegı next dedıgımız ıcın ıstegı bır sonrakı mıddleweare aktardı ıste ındex.js ye bununla ılgılı bır mıddleweare olusturmamız gerekıyor

         next(createError(400,err))
      }
     


}


const alluserdelete =  async (req,res,next)=>{


    try{
//herkesı sılcen ama admınlerı sılemeyeyım dıcen ornegın dolayısıyla 1.parametre kosul yazılcak
        const fındıduser = await User.deleteMany({isAdmin: false})

        if(fındıduser){
       
       console.log("tum kullacnılar sılındı Adminler haric")

        }else{
          

        const hatam = createError(400,"SİLME İŞLEMI YAPILAMADI")
        throw hatam 

        }


      
    
    
  
    
      }catch(err){
         
         next(err)
      }
     


}

const selfdelete = async (req,res,next)=>{

  
    try{

        const fındıduser = await User.findByIdAndDelete({_id:req.usersm._id})
      

        if(fındıduser){
       
       res.json({mesaj:"sılme ıslemınız basarılı (:"})

        }else{
          

        const hatam = createError(404,"kullanıcı bulunamadı")
        throw hatam 

        }


      
    
    
  
    
      }catch(err){
         
         next(createError(400,err))
      }
     


}

module.exports={
    alluserget,
    selfuser,
    selfupdate,
    createnewuser,
    userlogin,
    adminupdate,
    admindeleteuser,
    alluserdelete,
    selfdelete


}

