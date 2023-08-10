import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router";

import Cookies from "js-cookie";

const url="http://13.211.33.106:4500/"
// const url="http://localhost:4500/"
const token = Cookies.get('token');

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate()
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const showToast = useToast();

  useEffect(() => {
    // Fetch the post detail and comments from the API
    fetchPostDetail();
    fetchComments();
  }, []);

  const fetchPostDetail = async () => {
    try {
      const response = await fetch(`${url}api/full-post/${postId}`);
      const data = await response.json();
      console.log(data); // Log the data to inspect its structure

      if (response.ok) {
        setPost(data.fullPost); // Set the fetched post data
      } else {
        console.error("Error fetching post detail:", data.error);
      }
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${url}post-head/${postId}/comments`);
      const data = await response.json();
      console.log(data); // Log the data to inspect its structure

      if (response.ok) {
        setComments(data.comments); // Set the fetched comments data
      } else {
        console.error("Error fetching comments:", data.error);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(`${url}post-head/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ content: comment }),
      });
      const data = await response.json();
      console.log(data); // Log the data to inspect its structure

      if (response.ok) {
        // Add the new comment to the comments state
        setComments((prevComments) => [...prevComments, data.comment]);
        // Reset the comment input after submission
        setComment("");
      } else {
        console.error("Error adding comment:", data.error);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = async (commentId, newContent) => {
    const token = Cookies.get('token');
    try {
      const response = await fetch(`${url}post-body/postId/comment/:commentId`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ content: newContent }),
      });
      const data = await response.json();
      console.log(data); // Log the data to inspect its structure
  
      if (response.ok) {
        // Check if the authenticated user is the owner of the comment
        if (data.comment.userId === token.userId) {
          // Update the comment in the comments state
          setComments((prevComments) =>
            prevComments.map((c) => (c.id === commentId ? { ...c, content: newContent } : c))
          );
        } else {
          console.error('Error updating comment: You are not authorized to edit this comment.');
        }
      } else {
        console.error('Error updating comment:', data.error);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
  

  const handleDeleteComment = async (commentId) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(`${url}post-body/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      console.log(data); // Log the data to inspect its structure

      if (response.ok) {
        // Remove the comment from the comments state if the user is the owner
        setComments((prevComments) =>
          prevComments.filter((c) => c.id !== commentId)
        );
        // Show success toast for successful deletion
        showToast({
          title: 'Comment Deleted',
          description: 'Your comment has been successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Show error toast if deletion was not successful
        showToast({
          title: 'Error',
          description: 'You are not authorized to delete this comment',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Show error toast for any other errors
      showToast({
        title: 'Error',
        description: 'An error occurred while deleting the comment. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  const handleEditPost = async () => {
    const token = Cookies.get('token');
    try {
      const response = await fetch(`${url}api/full-post/${postId}`, { // Update the API URL here
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          title: 'Updated Title',
          description: 'Updated Description',
        }),
      });
      const data = await response.json();
      console.log(data); // Log the data to inspect its structure
  
      if (response.ok) {
        // Check if the authenticated user is the owner of the post
        if (data.postHead && data.postHead.userId === token.userId) { // Ensure data.postHead exists before checking userId
          // Update the post in the state
          setPost((prevPost) => ({
            ...prevPost,
            title: 'Updated Title',
            description: 'Updated Description',
          }));
        } else {
          console.error('Error updating post: You are not authorized to edit this post.');
        }
      } else {
        console.error('Error updating post:', data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  

  const handleDeletePost = async () => {
    
    const token = Cookies.get('token');
    try {
      const response = await fetch(`${url}api/my-post/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      console.log(data); // Log the data to inspect its structure
  
      if (response.ok) {
        // Check if the authenticated user is the owner of the post
        if (data.postHead.userId === token.userId) {
          // Post deleted successfully, you can redirect the user to another page or show a message
          navigate.push('/');
        } else {
          console.error('Error deleting post: You are not authorized to delete this post.');
        }
      } else {
        console.error('Error deleting post:', data.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  

  return (
    <Box className="container mt-4">
      {post ? (
        <>
          <h2>{post.title}</h2>
          <h3>Title: {post.description}</h3>
          <p>Posted by: {post.username}</p>
          <p>Date: {formatDate(post.createdAt)}</p>
          {post.postBody?.content ? ( // Add a conditional check for the post content
            <><p>{post.postBody.content}</p>
            {/* <Button colorScheme="teal" onClick={handleEditPost}>Edit Post</Button> */}
            <Button colorScheme="red" onClick={handleDeletePost}>Delete Post</Button>
            </>
          ) : (
            <p>No content available for this post.</p> // Show this message if there is no content
          )}
          <hr />
          <h4>Comments ({comments.length})</h4>
          {/* Add comment form here */}
          <Box>
            <Input
              placeholder="Write your comment..."
              value={comment}
              onChange={handleCommentChange}
              size="sm"
              mb="4"
            />
            <Button colorScheme="teal" onClick={handleSubmitComment}>
              Add Comment
            </Button>
          </Box>
          {/* Display comments here */}
          {comments.map((comment) => (
  <Box key={comment.id} bg="gray.100" p="4" borderRadius="md" my="2">
    <p>{comment.content}</p>
    <p>Date: {formatDate(comment.createdAt)}</p>
      <>
        <Button
          colorScheme="red"
          onClick={() => handleDeleteComment(comment.id)}
        >
          Delete
        </Button>
      </>
  </Box>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default PostDetail;
