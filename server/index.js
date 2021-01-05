const express=require('express')
const app=express()
const port=process.env.PORT || 5000

const mongoose=require('mongoose')
require('dotenv').config()


require('./models/user.js')
require('./models/post.js')
 require('./models/prof.js')

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

app.use(express.json())

app.use(require('./routes/auth.js'))
app.use(require('./routes/post.js'))
app.use(require('./routes/user.js'))
app.use(require('./routes/prof.js'))


app.listen(port,() =>{
    console.log('Express is running on port',port)
} )