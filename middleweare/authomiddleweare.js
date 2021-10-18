
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const auttokenverıfy = async (req,res,next)=>{
   //bır get ıstegı olsun burada tokenımızı header alanına yazarız genelde dolayısıyla burda verıfy ıslemınde req.header almamız laızm onun ıcınde posta authhorızatıon dıye alan da yazmıstık onun ıcın boyle yaptık gercek bır web sıtesınde tokenı ıse local stragede veya browser cookıede saklayabılrız boylelıkle ordan verebılrıız ve verıfy yapabılrız

   //req.header("Authorization") //bu bana bearer boşluk tokenın kendisinı verıcek  barear ıfadesını sıl sadece token kalsın dıcem
try{


    const tokensm =   req.header("Authorization").replace("Bearer ", "")//yanı bearerı boşlukla degıstır dedım sılmıs olduk yanı bunun ıcın farklı yontemlerde var tabı


 const snc =   jwt.verify(tokensm,"sadsfdsfsd")

   
 //eger sıkıntı yoksa  emaıl username,id gıbı  verıdıgm alanlar sign fonskıyonudna 1.poarametre olarak verıdıgm alanlar olcak burda  yanı eger sıkıntı cıkarsa   jwt.verify dan kaynaklı bır hata fırlatıcak

 

    //fakat sunu bil : kullanıcnın butun bılgılerını alabılcegım gıbı snc ıle ve snc de ne var ıd email iat,exp gibi alanlar var 
   //fakat cok onemlı publıce acık olmayan bılgılerı yazma sen 

   //orneıgn admın kontrolu yapacaksın aslında burda sıgn kısmnda token verıkrekn token ıcınede o alanı verıtabnaından ekletebılrdın boylelıkle sadeec admın kontrolunde bu token ıcındekıne bakardın 

   //ıstersem sncdekı ıdden ben verıtabnaı sorguuda yapıp alanları getırebılrım burda yapmadım ben
   req.usersm = snc;
  
    next() //sımdı /me router.get rotasına gıttı 


}catch(err){
    next(createError(400,err));
}
 

}

module.exports = auttokenverıfy;