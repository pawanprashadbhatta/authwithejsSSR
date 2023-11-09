const express=require("express")
const { User } = require("./model")
const app=express()
const bcrypt=require("bcrypt")

//viewengine lai set garne code below
app.set("view engine","ejs")

// parse garne code from frontend
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//get api
app.get("/register",(req,res)=>{
    res.render("register")
})
// crud api to insert into databse 
app.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    
       username
        email
        password
        await User.create({
            userName:username,
            userEmail:email,
            password:bcrypt.hashSync(password,10)
        })
        res.send("registered successfully")
})

//login api
app.get("/login",(req,res)=>{
    res.render("login")
})

//intracting withlogin
app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const userExist=await User.findAll({
        where:{
            userEmail:email
        }
    })
    if(userExist.length>0){
        const isMatched=    bcrypt.compareSync(password,userExist[0].password)
        if(isMatched){
           return res.send("login successful")
        }
        else{
            res.send("incalid crd")
        }
       }
       else{
        res.send("invalid email or password")
       }
  
})


//listen port
app.listen(3000,()=>{
    console.log("node started at port 3000")
})
