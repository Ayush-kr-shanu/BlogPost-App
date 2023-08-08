import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const url = "http://localhost:4500/";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the list of posts from the API
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${url}api/post-head`);
      const data = await response.json();
      console.log(data); // Log the data to inspect its structure

      if (response.ok) {
        setPosts(data.postHeads); // Access the correct array of post heads
      } else {
        console.error('Error fetching posts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Customize the date format as needed
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
              {/* <p className="card-text">Posted by: {post.username}</p> */}
              <p className="card-text">{post.description}</p>
              <p className="card-text">Posted on: {formatDate(post.createdAt)}</p> 
              <Link to={`/post/${post.id}`} className="btn btn-primary">Read More</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
