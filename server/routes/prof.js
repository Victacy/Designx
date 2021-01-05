const express=require('express')
const router=express.Router()
const requireLogin=require('../middleware/requiredLogin')
const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const Prof=require('../models/prof')

router.get('/file',(req,res) =>{
    Prof.find((err,docs) => {
        if (!err) {
          res .send(docs) 
        }else{
            console.log("Error while retrieving details :" +JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/file',(req,res) =>{
    const {about,skills,github,linkedin,facebook}=req.body
    const newRecord={
      about:about,
      skills:skills,  
      github:github,
      facebook:facebook,
      linkedin:linkedin
    }
    newRecord.save((err,doc) =>{
        if (!err) {
            res .send(docs) 
          }else{
              console.log("Error while retrieving details :" +JSON.stringify(err,undefined,2))
          } 
    })
})


router.put('/file',(req,res) =>{
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(422).send("No profile with that id :"+req.params.id) 
      }else{
          console.log("Error while retrieving details :" +JSON.stringify(err,undefined,2))
      } 

})


module.exports=router