
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
const Signup = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignup = async () => {
    try {
      // Perform form validation
      const newErrors = {};

      if (!name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!address.trim()) {
        newErrors.address = 'Name is required';
      }
      if (!mobile.trim()) {
        newErrors.mobile = 'Name is required';
      }
      if (!email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is not valid';
      }

      if (!password.trim()) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        await axios.post('http://localhost:8000/signup', { name,address, mobile, email, password, role });
        setMessage('User registered successfully');
      } else {
        setMessage('something wrong . Please check the details.');
      }
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <div className="container">
      <h1>Signup Here</h1>
      <div className="form-group">
        <label>Name:</label>
        <span>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        {errors.name && <span className="error-message">{errors.name}</span>}
        </span>
        
      </div>
      <div className="form-group">
        <label>Address:</label>
        <span>
        <input type="text" onChange={(e) => setAddress(e.target.value)} />
        {errors.name && <span className="error-message">{errors.address}</span>}
        </span>
        
      </div>
      <div className="form-group">
        <label>Mobile No.:</label>
        <span>
        <input type="number" onChange={(e) => setMobile(e.target.value)} />
        {errors.name && <span className="error-message">{errors.mobile}</span>}
        </span>
        
      </div>
      <div className="form-group">
        <label>Email:</label>
        <span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span className="error-message">{errors.email}</span>}
        </span>
        
      </div>
      <div className="form-group">
        <label>Password:</label>
        <span>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <span className="error-message">{errors.password}</span>}
        </span>
       
      </div>
      <div className="form-group">
                <label>Role:</label>
                <div className="radio-group">

                <span>
                    <input type="radio" id="user" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} />
                    <label htmlFor="user">User</label>
                </span>
                <span>
                    <input type="radio" id="admin" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} />
                    <label htmlFor="admin">admin</label>
                </span>
                <span>
                    <input type="radio" id="client" name="role" value="client" checked={role === "client"} onChange={() => setRole("client")} />
                    <label htmlFor="client">client</label>
                </span>

                </div>
            </div>

      <div className="button-group">
        <button className="button" onClick={handleSignup}> Signup</button>
      </div>
      <p className="message">{message}</p>
      <p>I have account <a href="/">Login Here</a></p>
    </div>
  );
};

export default Signup;
