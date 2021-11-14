
const User  = require("./../models/usermodel")
var createError = require('http-errors')


const admin = async (req,res,next)=>{
    
 try{
 
    
        const bulunnauser =  await User.findById({_id:req.usersm._id})

       
        if(bulunnauser){
            databaseuser = bulunnauser;
        }else{
            const hatas = createError(500,"admın yetkısınde bır ıslem yapıyorusnuz ama kişi bulunamadı giriş sayfasına yonlendırıldınız lutfen giriş yapınız")
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