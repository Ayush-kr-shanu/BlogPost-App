import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">Posted by: {post.username}</p>
            <p className="card-text">{post.description}</p>
            <a href={`/post/${post.id}`} className="btn btn-primary">Read More</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
