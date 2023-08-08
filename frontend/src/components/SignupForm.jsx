import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const url="http://13.211.33.106:4500/"

const SignupForm = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch(`${url}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setAlertMessage({ type: 'success', text: data.msg });
        setTimeout(() => {
          // Redirect to login page after a short delay (2 seconds in this example)
          navigate('/login');
        }, 2000);
      } else {
        setAlertMessage({ type: 'danger', text: data.msg });
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
              <h2 className="card-title text-center">Signup</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
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
                <button type="submit" className="btn btn-primary btn-block">Signup</button>
              </form>
              {alertMessage && (
                <div className={`alert alert-${alertMessage.type} mt-3`} role="alert">
                  {alertMessage.text}
                </div>
              )}
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
