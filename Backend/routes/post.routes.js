const express=require("express")
const { authenticate } = require("../middleware/auth")

require("dotenv").config()
const postRoute=express.Router()

postRoute.get("/post", authenticate, async(req,res)=>{
    try {
        
    } catch (err) {
        
    }
})