import React from 'react';

const PostDetail = ({ post }) => {
  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <p>Posted by: {post.username}</p>
      <p>{post.body}</p>
      <hr />
      <h4>Comments</h4>
      {/* Add comment form here */}
      {/* Display comments here */}
    </div>
  );
};

export default PostDetail;
