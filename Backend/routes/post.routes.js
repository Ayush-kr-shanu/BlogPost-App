const express=require("express")
const { authenticate } = require("../middleware/auth")
const { PostHead, PostBody }=require("../models/index")

require("dotenv").config()
const postRoute=express.Router()

//ALl POST-HEAD ROUTES-----------------------------------------------------------
postRoute.get("/post-head", async(req,res)=>{
    try {
        const postHeads = await PostHead.findAll();

        //return array of Posthead as the response
        return res.status(200).json({ postHeads });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
})

//Create post with posthead
postRoute.post('/post-head',authenticate, async (req, res) => {
    try {
      const { title, description } = req.body;
  
      // Create PostHead
      const postHead = await PostHead.create({ title, description });
  
      // Return the created PostHead as the response
      return res.status(201).json({ message: 'PostHead created successfully', postHead });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// get posthead by id
postRoute.get("/post-head/:id", async (req,res)=>{
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
postRoute.put("/post-head/:id",authenticate, async (req,res)=>{
    try {
        const postId=req.params.id
        const { title, description }=req.body
        const userId=req.user.id

        //Find the postHead by ID
        const postHead=await PostHead.findByPk(postId)

        if(!postHead){
            return res.status(404).json({msg:"PostHead not found"})
        }

        // Check if the authenticated user owns the PostHead
       if (postHead.UserId !== userId) {
         return res.status(403).json({ message: 'You are not authorized to update this PostHead' });
       }

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
postRoute.delete("/post-head/:id",authenticate, async (req,res)=>{
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        //Find the postHead by ID
        const postHead=await PostHead.findByPk(postId)

        if (!postHead) {
            return res.status(404).json({ message: 'PostHead not found' });
        }

       // Check if the authenticated user owns the PostHead
       if (postHead.UserId !== userId) {
         return res.status(403).json({ message: 'You are not authorized to update this PostHead' });
       }

       // Delete the PostHead
       await postHead.destroy();

       // Return a success message as the response
       return res.status(200).json({ message: 'PostHead deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
})

//ALL POST-BODY ROUTES-----------------------------------------------
// create postbody route
postRoute.post('/post-body', authenticate, async (req, res) => {
    try {
      const { content, postHeadId } = req.body;
  
      // Create PostBody with the provided postHeadId
      const postBody = await PostBody.create({ content, postHeadId });
  
      // Return the created PostBody as the response
      return res.status(201).json({ message: 'PostBody created successfully', postBody });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//update postbody
postRoute.put("/post-body/:id", authenticate, async (req, res) => {
    try {
      const postBodyId = req.params.id;
      const { content } = req.body;
      const userId = req.user.id;
  
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
  
      // Update the PostBody content
      postBody.content = content;
      await postBody.save();
  
      // Return the updated PostBody as the response
      return res.status(200).json({ message: 'PostBody updated successfully', postBody });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  


//FULL POSTS ROUTES-------------------------------------------------------------
//get full post 
postRoute.get('/full-post/:postHeadId', async (req, res) => {
    try {
      const postHeadId = req.params.postHeadId;
  
      // Find the PostHead by postHeadId and include the associated PostBody
      const fullPost = await PostHead.findOne({
        where: { id: postHeadId },
        include: {
          model: PostBody,
          as: 'postBody',
        },
      });
  
      if (!fullPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Return the full post as the response
      return res.status(200).json({ fullPost });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// Route to create a new post
postRoute.post('/post', authenticate,  async (req, res) => {
    try {
      const { title, description, content } = req.body;
    //   const userId = req.user.id;
  
      // Create the postHead
      const postHead = await PostHead.create({ title, description });
  
      // Create the associated postBody
      const postBody = await PostBody.create({ content, postHeadId: postHead.id });
  
      // Return the created postHead and postBody as the response
      return res.status(201).json({ message: 'Post created successfully', postHead, postBody });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
});




module.exports={postRoute}