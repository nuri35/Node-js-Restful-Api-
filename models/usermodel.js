
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
        default:false 
      }
    
    },{ autoCreate: true ,collection:"user",timestamps:true});
    

    const schema = Joi.object({
      isim : Joi.string().min(3).max(15).trim(),
      UserName:Joi.string().min(3).max(15).trim(),
      email:Joi.string().trim().email(),
      password:Joi.string().trim()

    })




    userSchema.methods.joivalidatıon = function(cb) {


schema.required();


      return schema.validate(cb)

    };


    userSchema.statics.joivalidatıonforupdate = function(cb) {
      
          
            return schema.validate(cb)
      
           
            
          };

userSchema.methods.toJSON = function(){
  
  const user = this.toObject();
 

  delete user._id;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  

  return user;


}


  userSchema.statics.login = async function (email,password){
       

      const {error,sonuc} =  schema.validate({email,password});

      if(error){
        throw createError(400,error);
      }


  
      const sonucus =  await User.findOne({email})

      if(!sonucus){
        throw createError(400,"girilen degerler hatalı yada lütfen üye olunuz")

      }
      const control =  await bcrypt.compare(password,sonucus.password)


      if(!control){
        throw createError(400,"girilen degerler hatalı yada lütfen üye olunuz")
      }
      return sonucus 



  }


  userSchema.methods.generateToken =  async function(){


    const girisyapanuser =this;
  
    const token = await  jwt.sign({_id:girisyapanuser._id,email:girisyapanuser.email}, 'sadsfdsfsd',{ expiresIn: 60 * 60 }, { algorithm: 'RS256'});

    return token;

  }


 const User = mongoose.model('user', userSchema)
 

 module.exports = User;

