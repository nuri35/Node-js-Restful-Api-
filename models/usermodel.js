
const mongoose = require("mongoose")
const Joi = require('joi');
var createError = require('http-errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


    const userSchema = new mongoose.Schema({
      isim: {
          type:String,
          required:true,
          trim:true,
          minlength:3,
          maxlength:15
      },
      UserName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:3,
        maxlength:55
      },
      email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:3,
        maxlength:55,
        lowercase:true,
        validate: {
            validator: function(v) {
                return  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
                
            },
            message: "Please enter a valid email"
            
           
          },
      },
      password:{
            type:String,
            unique: true,
            required: true,
            index:true,
            minlength:7,
            maxlength:100,
           //match: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]$/,

           


      },
      isAdmin:{
        type:Boolean,
        default:false //eklenen kullacnı verıtabanına bu alan ıle bırlıkte false olarak eklensın 
      }
    
    },{ autoCreate: true ,collection:"user",timestamps:true});
    
//daha duzenlı kod ıcın boyle yapalım
    const schema = Joi.object({
      isim : Joi.string().min(3).max(15).trim(),
      UserName:Joi.string().min(3).max(15).trim(),
      email:Joi.string().trim().email(),
      password:Joi.string().trim()

    })




    //yukardakı schemadkaıler verıtabnaı kısmındakı valıdatıonlar o kosullara göre hareket eder fakat  daha verıtabnaına gıtmeden burdakı alanları kontrol ederız ve eger uygunsa verıtabnaına yollayabılrıız ve ordakı kuralları ısler
    userSchema.methods.joivalidatıon = function(cb) {


schema.required();//daha okunaklı oldu boyle boylelıkle butun sema alanlarını requıred ekle demıs olduk

//kosullarımızı yazalım
      // const schema = Joi.object({
      //   isim : Joi.string().min(3).max(15).trim().required(),
      //   UserName:Joi.string().min(3).max(15).trim().required(),
      //   email:Joi.string().trim().email().required(),
      //   password:Joi.string().trim().required()

      // })
//sımdı  userchemaya bır metot ekledık ve return dıyerek şu semadakı ( const schemadakı) kurallara neyı uygulamak ıstıyorsunuz cb dekı degerlerı onuda kullanıcı zaten verıcek ayrıca  schema.validate ,joıden gelen bır ozellık ayrıntı ıcın dokumanına bakarasın zaten 
      return schema.validate(cb)

      //sonuc olarak bu joi bana ne sunar calsıtırdıgımda ya eror yada data sunar burda bır kontrol etme var  ve uzun ıslem aslında burda ıstersen await schema.validateAsync fonskıyonunu kullanabırlsın  eger hata varsa hata kısmı dolu olur hata yoksa hata kısmı boş olur value kısmı dolu olur buna göre git user.js dosyasında ıslemını yap
      
    };


    userSchema.statics.joivalidatıonforupdate = function(cb) {
      
          
            return schema.validate(cb)
      
           
            
          };

//aslıdna hanı ekledıgımız verılerın butun alanlarını gorebılyıoruz ya mesela kullanıcya sıfre alanı updatedat createdat gıbı alanları gostermek ıstemeyebılrız bunuda res.json(sonuc.name) dııyp sadece ıste name alanı goster  vs demek yerıne yanı sonuc.name dıyerek ıste bu adlı kısı guncellendı mesajı verırken boyle bır yontem yerıne  burda bır metot olsuturup yapabılrız

//TOJSON dıye bır metot varmıs  bunu kullanabılrım ve kullanıcı eklendıgınde yada guncellendıgınde ben bu verıyı gecıyorum aslında arkaplanda bu metot teetıklenıyor ben bunun uzerıne yazarsam  kendıme gore degıstırısem  cıktılarda burda yazdıgım kurallara göre olacaktır ayrıca bakınız : https://mongoosejs.com/docs/api.html#schema_Schema.reserved bu fonksıyon sayesındne ornegın guncelleme fonskıyonu calsıtııdıgımzda bıze bır guncellenen kısının alanlarını pathlerını verıyor ya ıste orda bu fonksıyon tetılenıyor dolayısıyla bunu ezıyoruz ıstedıgımzı alanları gosterdıyoruz
userSchema.methods.toJSON = function(){
  //neden this dedık o an uzerınde claısılan user objesını bana ver  ama oncelıkle objeye donustur dememız lazım cunku json seklınde  
  const user = this.toObject();
  //sımdı gostermeyecegımzı alanları delete edelım yanı kullancıya yollama anlamında demıs olduk

  delete user._id;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  //sımdı bu  olsutrudugmuz user nesneısnı return edelım

  return user;


}


  userSchema.statics.login = async function (email,password){
       

//joıcontroller da bana bır nesne yollar error ve sonuc olarak 
      //const joicontroler = schema.validate({email,password})
      const {error,sonuc} =  schema.validate({email,password});//bunu awaıt demeye gerek yok

      if(error){
        throw createError(400,error);
      }//eger buraya ugramassa asagı dogru devam edecektır


    //email:email seklındeyapabılırdık boyle kısa kullandım 1.parametrede nabıyor verıtabnaına gıdıyor email alanında bızım parametre olarak gecıtıgmız email bulmaya calsıyor 
      const sonucus =  await User.findOne({email})

      if(!sonucus){//verıtabnaında yoksa 
//burda 404 dıyıp sıfre emaıl bulunamadı dıyıp detaylı bılgı vermek yerıne 400 dıyıp kotu ıstek dıyelım kullanıcı emaıl vs bulunamamasıda bır bad requesttır
        throw createError(400,"girilen degerler hatalı yada lütfen üye olunuz")

      }//eger buraya ugramazssa yanı varsa emaıl bılgısı unıq olarak sımdıde sıfreyı kontrol etsın 

      //2.parmetre olarak fındone ıle buldugumuz kısının verıtabnaındak kayıtlı hashlenmıs sıfreyı gırerıre
      const control =  await bcrypt.compare(password,sonucus.password)


      if(!control){
        throw createError(400,"girilen degerler hatalı yada lütfen üye olunuz")
      }//burdakı ıfe takılmadııgndada 

      return sonucus // o olan kısıyı dondurduk



  }


  userSchema.methods.generateToken =  async function(){
//burda parametre gecmemıze gerek yok

    const girisyapanuser =this;//butun verıler burda o ınstancemızdakı
  
    const token = await  jwt.sign({_id:girisyapanuser._id,email:girisyapanuser.email}, 'sadsfdsfsd',{ expiresIn: 60 * 60 }, { algorithm: 'RS256'});

    return token;

  }

//bunu export edelım zaten userschemanın metotlarına vs yazdık fonskıyonlarımızı ısteıdıgmızı
 const User = mongoose.model('user', userSchema)
 

 module.exports = User;

