const express=require('express')
const app=express()
const port=process.env.PORT || 5000

const mongoose=require('mongoose')
require('dotenv').config()


require('./models/user.js')
require('./models/post.js')

const config={
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}


mongoose.connect(process.env.CONNECT_URI,config)
.then(() => {
    console.log("Connected successfully to MONGODB")
})

.catch(err => {
    console.log("A problem occurred",err)
})
// serve -s build
app.use(express.json())

app.use(require('./routes/auth.js'))
app.use(require('./routes/post.js'))
app.use(require('./routes/user.js'))

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.use("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port,() =>{
    console.log('Express is running on port',port)
} )