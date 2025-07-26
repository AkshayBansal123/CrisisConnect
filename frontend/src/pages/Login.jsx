



import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = () => {
  useEffect(() => {
       
    const modalElement = document.getElementById('exampleModalCenter');
    const modal = new window.bootstrap.Modal(modalElement);
    modal.show(); 
  }, []);
const [user,setUser]=useState({username:'',password:''});
       const navigate= useNavigate();
       const handleLogin= async(e)=>{
         e.preventDefault();
        console.log("User data being sent:", user);

        try{
const res = await axios.post('http://localhost:5000/api/login', user);
        console.log("Login successful:", res.data);
        if(res.data.token){
          localStorage.setItem('token', res.data.token);
         localStorage.setItem('userId',res.data.userId);
          localStorage.setItem('role', res.data.role);
          navigate(`/${res.data.role}`);
        }
        }
        catch(err){
          console.error('Error logging in:', err);
          alert('Login failed. Please check your credentials and try again.');
        }
      }
  return (
    <div>
     
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered w-100 h-100" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Login to your account</h5>
          <div className="existing-user-section mt-7">
    <p className="mt-1">Don't have an account?</p>
    <a href="/register" >Register here</a>
  </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
              <label htmlFor="username" className="form-label">Username</label>
                <input type="text" id="username"
        className="form-control"
        placeholder="Enter your username"  onChange={e=> setUser({...user,username:e.target.value})}
        required></input>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password"
        className="form-control"
        placeholder="Enter your password" onChange={e=> setUser({...user,password:e.target.value})}
        required></input>
                
                     <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

