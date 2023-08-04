const express=require("express")
const { authenticate } = require("../middleware/auth")
const { PostHead, PostBody }=require("../models/index")

require("dotenv").config()
const postRoute=express.Router()

//ALl POST-HEAD ROUTES-----------------------------------------------------------
postRoute.get("/post", async(req,res)=>{
    try {
        const postHeads = await PostHead.findAll();

        //return array of Posthead as the response
        return res.status(200).json({ postHeads });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
})

//Create post with posthead and postbody 
postRoute.post("/post", async(req,res)=>{
    try {
        const { title, description, content } = req.body;
        // const userId=req.user.userId

        //create postHead
        const postHead=await PostHead.create({title, description})

        // Create the associated PostBody
        const postBody = await PostBody.create({ content, PostHeadId: postHead.id });

        // Return the created PostHead and PostBody as the response
        return res.status(201).json({ message: 'PostHead and PostBody created successfully', postHead, postBody });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
})


// get posthead by id
postRoute.get("/post/:id", async (req,res)=>{
    try {
        const postId=req.params.id

        // Find the postHead by ID
        const postHead=await PostHead.findByPk(postId)

        if(!postHead){
            return res.status(404).json({msg:"PostHead not found"})
        }
        // Return the found PostHead as the response
        return res.status(200).json({ postHead });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
})

// update posthead by id
postRoute.put("/post/:id", async (req,res)=>{
    try {
        const postId=req.params.id
        const { title, description }=req.body
        // const userId=req.user.id

        //Find the postHead by ID
        const postHead=await PostHead.findByPk(postId)

        if(!postHead){
            return res.status(404).json({msg:"PostHead not found"})
        }

        // Check if the authenticated user owns the PostHead
       //if (postHead.UserId !== userId) {
       //   return res.status(403).json({ message: 'You are not authorized to update this PostHead' });
       //}

        // Update the PostHead
       postHead.title = title;
       postHead.description = description;
       await postHead.save();

       // Return the updated PostHead as the response
      return res.status(200).json({ message: 'PostHead updated successfully', postHead });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message }); 
    }
})

// delete posthead by id
postRoute.delete("/post/:id", async (req,res)=>{
    try {
        const postId = req.params.id;
        // const userId = req.user.id;

        //Find the postHead by ID
        const postHead=await PostHead.findByPk(postId)

        if (!postHead) {
            return res.status(404).json({ message: 'PostHead not found' });
        }

       // Check if the authenticated user owns the PostHead
       //if (postHead.UserId !== userId) {
       //   return res.status(403).json({ message: 'You are not authorized to update this PostHead' });
       //}

       // Delete the PostHead
       await postHead.destroy();

       // Return a success message as the response
       return res.status(200).json({ message: 'PostHead deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
})

//ALL POST-BODY ROUTES-----------------------------------------------
postRoute.get("/full-post", async (req,res)=>{
    try {
        const postHead=await PostHead.findByPk(postId, {
            include:{
                model: PostBody,
                as: 'postBody'
            }
        })

        if(!postHead){
            res.status(404).json({msg:"PostHead not found"})
        }

        // Access the associated PostBody
        // console.log(postHead.postBody.content);

         // Return the PostHead with the associated PostBody
        return res.status(200).json({msg:"Post", post:postHead});
    } catch (err) {
        
    }
})

postRoute.put("/post-body", async(req,res)=>{
    try {
        const postBodyId=req.params.id
        const {content}=req.body
        // const userId=req.user.id

        // Find the PostBody by ID
       const postBody = await PostBody.findByPk(postBodyId);

       if (!postBody) {
        return res.status(404).json({ message: 'PostBody not found' });
      }

       // Check if the authenticated user owns the associated PostHead
      const postHead = await db.PostHead.findByPk(postBody.PostHeadId);
      if (!postHead || postHead.UserId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this PostBody' });
      } 
    } catch (err) {
        
    }
})


module.exports={postRoute}