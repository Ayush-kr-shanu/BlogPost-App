import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import url from './url';

const PostList = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${url}api/post-head`);
      const data = await response.json();

      if (response.ok) {
        setPosts(data.postHeads);
      } else {
        console.error('Error fetching posts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const token = Cookies.get('token');
    try {
      const response = await fetch(`${url}api/post-head/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}` 
        }
      });

      if (response.ok) {
        fetchPosts(); // Refresh the list after deletion
      } else {
          toast({
            title: "Authorization Error",
            description: "You are not authorized to delete this post",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.description}</p>
              <p className="card-text">Posted on: {formatDate(post.createdAt)}</p>
              <Link to={`/post/${post.id}`} className="btn btn-primary">Read More</Link>
              <button
                    className="btn btn-danger"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
