// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginFrom';
import SignupForm from './components/SignupForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

const App = () => {
  const isLoggedIn = false; // Replace this with actual authentication logic
  const posts = []; // Replace this with your list of posts
  const post = {}; // Replace this with your selected post details

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<PostList posts={posts} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/post/:id" element={<PostDetail post={post} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
