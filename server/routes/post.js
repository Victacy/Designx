const express=require('express')
const router=express.Router()
const requireLogin=require('../middleware/requiredLogin')
const Work=require('../models/post')



router.get('/allwork',requireLogin,(req,res) =>{
    Work.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(works => {
        res.json({works})
    })
    .catch(err => {
        console.log(err)
    })
})


router.post('/creatework',requireLogin,(req,res) =>{
    const {title,body,pic} =req.body
    if(!title || !body || !pic){
        return res.status(422).json({message:"Please add all field "})
    }
   
    req.user.password=undefined

    const work=new Work({
        title:title,
        body:body,
        photo:pic,
        postedBy:req.user
    })
    work.save()
    .then(result =>{
        res.json({work:result})
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/mypost',requireLogin,(req,res)=>{
    Work.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
    Work.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/dislike',requireLogin,(req,res)=>{
    Work.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Work.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy", "_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.delete('/deletepost/:postId',requireLogin,(req,res) => {
    Work.findOne({_id:req.params.postId})
    .populate("postedBy", "_id")
    .exec((err,post) =>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err)
            })
        }
    })
})

// router.post('/details',requireLogin,(req,res) =>{
//     const {aboutMe,skills,facebook,github,linkedIn} =req.body
//     if(!aboutMe || !skills || !facebook || !github || !linkedIn){
//         return res.status(422).json({message:"Please add all field "})
//     }
   

//     const data=new Work({
//         aboutMe:aboutMe,
//         skills:skills,
//         facebook:facebook,
//         github:github,
//         linkedIn:linkedIn
//     })
//     data.save()
//     .then(result =>{
//         res.json({data:result})
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

module.exports=router