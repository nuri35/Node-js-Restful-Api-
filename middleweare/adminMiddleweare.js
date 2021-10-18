
const User  = require("./../models/usermodel")
var createError = require('http-errors')
// const User = schemam.schema(); ıste burda patladık bız usermodel de bır fosnkıyon dısarı export ettık hata alıyoruz  compıle hatası zaten clasıtırmıstık onu bız  dolayısıyla ondan gıdelım  const User = mongoose.model('user', userSchema) bunu dırek export edelım

const admin = async (req,res,next)=>{
    
 try{
 
    // console.log(req.usersm)
    // _id: '615ac5ffc5fc7c369243e6f8',
    // email: 'gs_@gmaik.com',
    // iat: 1633340009,
    // exp: 1633343609 bu tokendakı payloaddakı alanlar  ıdden verıtabnaı sorguu yapıp baska alana ulasmalıym

    // const databaseuser = await User.findById({_id:req.usersm._id}) //bu ıdlı kısının verıtabnaındakı alanlarını verdı

    // databaseuser null ıse soyle yapalım 
        const bulunnauser =  await User.findById({_id:req.usersm._id})

        //ıste null degılse 
        if(bulunnauser){
            databaseuser = bulunnauser;
        }else{//kısı sılındıgı ıcın zaten dolayısıyla verıtabnaında yok 
            const hatas = createError(500,"admın yetkısınde bır ıslem yapıyorusnuz ama kişi bulunamadı giriş sayfasına yonlendırıldınız lutfen giriş yapınız")//ve verıtabnaında bu kısı yok ve token hernekadar gecerlı olsa bıle  bır kullancıyı temsıl etmemektedır.gınede burda tokenın expoloer olamsını beklersın doalyısıyla token surelerını kısa tutmak mantıklı bır yol olur ayrıca https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens bu yontem burda kalsın bız web stiesini bakcend ıle kodlayacagımzı zaman bu tokenlar localstrage yada cookılerde tutucaz browserda ozmanda bır delete ıslemı oldguunda yada logout yaptıgında bu yazdıkaı yontemlerı kullanabılrız
            throw hatas
        }

    if(!databaseuser.isAdmin){
        const hatam = createError(403,"Buraya girişiniz yok lutfen Admin yetkisi alınız")
        throw hatam 
    }

    if(databaseuser.isAdmin){
        next()
    }
   
 
 
 }catch(err){
     next(createError(400,err));
 }
  
 
 }
 
 module.exports = admin;