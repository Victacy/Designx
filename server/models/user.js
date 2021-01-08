const mongoose=require('mongoose')
// const {ObjectId}=mongoose.Schema.Types

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
    photo:{
        type:String,
        default:"https://res.cloudinary.com/victory/image/upload/v1609269817/download_pg1fyo.png"
    }
    // viewers:[{type:ObjectId,ref:"User"}],
    // views:[{type:ObjectId,ref:"User"}]
})



const User=mongoose.model("User",userSchema)

module.exports=User
