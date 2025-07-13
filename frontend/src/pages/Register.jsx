import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Modals.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Register = () => {
const navigate =useNavigate()
  const [user,setUser]=useState({username:'',role:'',password:'',email:'',contact:'',ngo:null,assignedDisasters:[]});
    const handleRegister = async () => {
    await axios.post('http://localhost:5000/register', user);
    navigate('/login');
  }
  const [ngos,setngos]=useState([]);
      useEffect(() => {
         
         const fetchngos = async () => {
          const token= localStorage.getItem('token');
          try{
            const res = await axios.get('http://localhost:5000/api/ngos', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setngos(res.data);
          }
          catch(err){
            console.error('Error fetching NGOs:', err);
          }
         }
         fetchngos();
        const modalElement = document.getElementById('exampleModalCenter');
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show(); 
      }, []);
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
              <h5 className="modal-title" id="exampleModalCenterTitle">Create new account</h5>
          <div className="existing-user-section mt-7">
    <p className="mt-1">Already existing user?</p>
    <a href="/login" >Login here</a>
  </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form >
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
                <label htmlFor="role" className="form-label">Select role</label>
                <select id="role" className="form-select" onChange={e => setUser({ ...user, role: e.target.value })} required>
                    <option value="volunteer">Volunteer</option>
                    <option value="victim">Victim</option>
                    </select>
                    <label htmlFor="contact" className="form-label">Contact no</label>
                <input type="text" id="contact"
        className="form-control"
        placeholder="Enter your contact no"   onChange={e=> setUser({...user,contact:e.target.value})}
        required></input>
        <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email"  onChange={e=> setUser({...user,email:e.target.value})}
        className="form-control"
        placeholder="Enter your email"
        required></input>
        {user.role=='volunteer' && (
          <div>
            <label htmlFor="ngo" className="form-label">Select NGO</label>
            <select id="ngo" className="form-select" onChange={e => setUser({ ...user, ngo: e.target.value })} required>
              <option value="">Select NGO</option>
              {ngos.map(ngo => (
                <option key={ngo._id} value={ngo._id}>
                  {ngo.username}
                </option>
              ))}
            </select>
          </div>
        )}
                     <button onClick={handleRegister} className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
