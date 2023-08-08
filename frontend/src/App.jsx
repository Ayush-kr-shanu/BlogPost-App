import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginFrom';
import SignupForm from './components/SignupForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePostForm from './components/CreatePost';
import MyPosts from './components/Mypost';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
  const [username, setUsername] = useState('')
  const [posts, setPosts] = useState([]);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    Cookies.set('username', username, { expires: 7 });
  };
  

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = '/';
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} username={username}/>
      <Routes>
        <Route path="/" element={<PostList posts={posts} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/create-post" element={<CreatePostForm />} />
        <Route path="/mypost" element={<MyPosts />} />
        <Route path='/post/:postId' element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
