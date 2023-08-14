import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from './url';


const LoginForm = ({onLogin}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [alertMessage, setAlertMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      // console.log(data, "THis is sdfdsgds")

      if (response.ok) {
        const token=data.Token
        console.log("Token received from server:", token);

        
        Cookies.set('token', data.Token, { expires: 7 })
        Cookies.set('username', data.user.name, { expires: 7 });
        setAlertMessage({ type: 'success', text: data.message });
        setTimeout(() => {
          navigate('/');
        }, 2000);
        onLogin(data.user.name);
      } else {
        setAlertMessage({ type: 'danger', text: data.error });
      }
    } catch (error) {
      setAlertMessage({ type: 'danger', text: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
              {alertMessage && (
                <div className={`alert alert-${alertMessage.type} mt-3`} role="alert">
                  {alertMessage.text}
                </div>
              )}
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
