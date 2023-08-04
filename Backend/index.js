const express=require("express")
const cookieParser = require('cookie-parser');

const db=require("./models/index")
const { userRoute } = require("./routes/user.routes")
const { authenticate } = require("./middleware/auth");
const { postRoute } = require("./routes/post.routes");

require("dotenv").config()
const app=express()

app.use(express.json())
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Welcome to Backend")
})


app.use("/", userRoute)
app.use("/api", postRoute)
app.get("/pro", authenticate, (req,res)=>{
    res.send("Protected route")
})

db.sequelize.sync().then(()=>{
    app.listen(4500, ()=>{
        console.log("Server started");
    })
})