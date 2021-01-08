const express=require('express')
const router=express.Router()
const User = require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require("../config/key")
const requireLogin=require('../middleware/requiredLogin')

router.post('/signup',(req,res) =>{
    const {name,email,password,pic}=req.body
    if(!email || !password || !name){
       return res.status(422).json({error:"please the input fields are empty"})
    }
    User.findOne({email:email})
    .then((savedUser) =>{
        if(savedUser){
            return res.status(422).json({error:"user with that email already exists"})
        }
       
        bcrypt.hash(password,12)
        .then(hashedpassword =>{
            const user=new User({
                name:name,
                email:email,
                password:hashedpassword,
                pic
            })
            user.save()
            .then(user =>{

                res.json({message:"Successfully saved"})
            }).catch(err =>{
                console.log(err)
            }) 
        })
        
           
        
       
       
    }).catch(err =>{
        console.log(err)
    })
})


router.post('/login',(req,res) => {
    const{email,password}= req.body
    if(!email || !password){
      return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                // res.json({message:"successfully logged in"})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const{_id,name,email,pic} =savedUser
                res.json({token,user:{_id,name,email,pic}})

            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err =>{
            console.log(err)
        })
    })
})





module.exports=router