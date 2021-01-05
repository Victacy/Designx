const express=require('express')
const router=express.Router()
const User = require('../models/user')
// const crypto=require('crypto')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require("../config/key")
const requireLogin=require('../middleware/requiredLogin')
// const nodemailer=require('nodemailer')
// const sendgridTransport=require('nodemailer-sendgrid-transport')


// const transporter=nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:"   "
//     }
// }))

// router.get('/',(req,res) =>{
//     res.send('Hello')
// })
router.get('/protected',requireLogin,(req,res) =>{
    res.send("Hello user")
})



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
                // transporter.sendMail({
                //     to:user.email,
                //     from:"no-reply@designx.com",
                //     subject:"successfully created an account",
                //     html:`<h1>Welcome to designx</h1> <br/><h4>At designx we help you as a designer or a viewer to either add your works to our website and also view others</h4>`"
                // })
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


// router.post('reset-password',(req,res) => {
//     crypto.randomBytes(32,(err,buffer) => {
//         if(err){
//             console.log(error)
//         }
//         const token=buffer.toString("hex")
//         User.findOne({email:req.body.email})
//         .then(user => {
//             if(!user){
//                 return res.status(422).json({error:"User with that emil doesn't exists"})
//             }
//             user.resetToken=token
//             user.expireToken=Date.now() | 3600000
//             user.save()
//             .then((result) => {
//                 transporter.sendMail({
//                     to:user.email,
//                     from:"no-reply@designx.com",
//                     subject:"reset password",
//                     html:`
//                     <p>You requested for a password reset</p>
//                     <h5>Clink on this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h5>
//                     `
//                 })
//                 res.json({message:"Check your email"})
//             })
//         })
//     })
// })

module.exports=router