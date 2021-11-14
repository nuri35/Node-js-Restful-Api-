
const User  = require("./../models/usermodel")
const createError = require('http-errors')
const bcrypt = require('bcrypt');








const alluserget =  async (req,res)=>{
  
  try{
    const tumuser = await User.find({})
res.json(tumuser);

console.log("Admin yetknız bulunmaktadır.tum userlar getırılme basarılı ")

  }catch(err){
     next(err)
  }
 


}



const selfuser = async (req,res)=>{
    
    res.json(req.usersm)
    
    
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
      
        
    try{
   
    
        const ınsertus =   new User(req.body)
    
      
    ınsertus.password = await bcrypt.hash(ınsertus.password,12);
       const {error,sonuc} = await ınsertus.joivalidatıon(req.body)
        if(error){
            const hatam = createError(406,"uygun koşulda veri giriniz,kabul edilemez " + error)
            throw hatam 
        }else{
    
    
    
            const dataınsert = await ınsertus.save()
    
        res.json(dataınsert)  
        }
    
      
    
    }catch (err) {
      
    
        next(createError(400,err))
    }
    
    }



    const userlogin =  async (req,res,next)=> {

        try{
    
           
    
           const logınprocess =  await User.login(req.body.email,req.body.password)
    
          
           const token = await  logınprocess.generateToken(logınprocess)
    
           
    
         
            res.json({user:logınprocess,token:token})
    
  
    
    
        }catch(err){
            next(err)
        }
    
    
    }

const adminupdate = async(req,res,next)=>{
   
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
    


    
     const upval = await User.findByIdAndUpdate({ _id:req.params.id},req.body,{new:true,runValidators:true})


     if(upval){
     
     
     
         return res.json(upval)
     }else{
        
     
         const hatam = createError(404,"Güncellenecek kişi bulunamadı")
         throw hatam 
     }



}







}catch(err){
   
    next(createError(400,err))


}

}

const admindeleteuser =  async (req,res,next)=>{
  

    try{

        const fındıduser = await User.findById({_id:req.params.id})

        if(fındıduser){
        const deletedata = await User.findOneAndDelete({_id:req.params.id})
       
        }else{
        
        const hatam = createError(404,"Kullanıcı Bulunamadı")
        throw hatam 

        }


      
    
    
  
    
      }catch(err){
       

         next(createError(400,err))
      }
     


}


const alluserdelete =  async (req,res,next)=>{


    try{

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

