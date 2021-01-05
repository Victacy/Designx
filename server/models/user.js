const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
        type:String,
        default:"https://res.cloudinary.com/victory/image/upload/v1609269817/download_pg1fyo.png"
    }

})



const User=mongoose.model("User",userSchema)

module.exports=User
