const express=require("express")
const { authenticate } = require("../middleware/auth")
const { PostHead, PostBody }=require("../models/index")

require("dotenv").config()
const commentRoute=express.Router()

// Create a comment for a specific post
commentRoute.post("/post-body/:postId/comment", authenticate, async (req, res) => {
    try {
      const { content } = req.body;
      const { postId } = req.params;
  
      // Create the comment and associate it with the specific post
      const comment = await Comment.create({ content, postId });
  
      return res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
// Get all comments for a specific post
commentRoute.get("/post-body/:postId/comments", async (req, res) => {
    try {
      const { postId } = req.params;
  
      // Find all comments associated with the specific post
      const comments = await Comment.findAll({ where: { postId } });
  
      return res.status(200).json({ comments });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// Update a specific comment
commentRoute.put("/post-body/:postId/comment/:commentId",authenticate,  async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const { content } = req.body;
  
      // Find the comment associated with the specific post and commentId
      const comment = await Comment.findOne({ where: { id: commentId, postId } });
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Update the comment
      comment.content = content;
      await comment.save();
  
      return res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
});
  
// Delete a specific comment
commentRoute.delete("/post-body/:postId/comment/:commentId",authenticate, async (req, res) => {
    try {
      const { postId, commentId } = req.params;
  
      // Find the comment associated with the specific post and commentId
      const comment = await Comment.findOne({ where: { id: commentId, postId } });
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Delete the comment
      await comment.destroy();
  
      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
});
  
module.exports={commentRoute}