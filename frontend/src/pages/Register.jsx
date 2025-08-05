import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Modals.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
const Register = () => {
const navigate =useNavigate()
  const [user,setUser]=useState({username:'',role:'',password:'',email:'',contact:'',ngo:null,assignedDisasters:[]});
    const handleRegister = async (e) => {
        e.preventDefault(); // ✅ stops reload
         console.log(user);
        try{
     const userToSend = { ...user };
    
    if (userToSend.role !== 'volunteer') {
      userToSend.ngo = null;
    }

    if (userToSend.ngo === '') {
      userToSend.ngo = null;
    }
await axios.post('http://localhost:5000/api/register', userToSend);
    navigate('/login');
        }
    catch(err){
        console.error('Error registering user:', err);
        alert('Registration failed. Please try again.');
    }
  }
const modalRef = useRef(null); 
const [modalInstance, setModalInstance] = useState(null);
const [ngos,setngos]=useState([]);
      useEffect(() => {
         const modalElement = document.getElementById('exampleModalCenter');
  const modal = new window.bootstrap.Modal(modalElement);
  modalRef.current = modalElement;
  setModalInstance(modal);
  modal.show();
         const fetchngos = async () => {
        
          try{
            const res = await axios.get('http://localhost:5000/api/ngos');
            setngos(res.data);
          }
          catch(err){
            console.error('Error fetching NGOs:', err);
          }
         }
         fetchngos();
       
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
  onClick={() =>  {
  if (modalInstance) {
    modalInstance.hide();
  }
  navigate('/');
}}
  aria-label="Close"
></button>
            </div>
            <div className="modal-body">
              <form  onSubmit={handleRegister}>
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
                 <option value="" disabled>Select Role</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="reporter">Reporter
                    </option>
                     <option value="ngo">NGO
                    </option>
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
     
        {user.role === 'volunteer' && (
  <div>
    <label htmlFor="ngo" className="form-label">Select NGO</label>
    <select
      id="ngo"
      className="form-select"
      disabled={ngos.length === 0}
      onChange={e => setUser({ ...user, ngo: e.target.value })}
      required
    >
      <option value="">{ngos.length === 0 ? 'No NGOs available' : 'Select NGO'}</option>
      {ngos.map(ngo => (
        <option key={ngo._id} value={ngo._id}>
          {ngo.username}
        </option>
      ))}
    </select>
  </div>
)}
                     <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
