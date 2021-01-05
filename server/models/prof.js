const mongoose=require('mongoose')


const profSchema = new mongoose.Schema({
    about:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    linkedin:{
        type:String,
        required:true
    },
    facebook:{
        type:String,
        required:true
    }

})



const Prof=mongoose.model("Prof",profSchema)

module.exports=Prof
