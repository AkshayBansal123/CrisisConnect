import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import {useEffect } from 'react';
import axios from 'axios';
const NGOAdmin = () => {
  const navigate = useNavigate();
  const [reports,setReports]=useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
      useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || role !== 'ngo') {
        navigate('/unauthorized'); // or redirect to login
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/reports', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReports(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/unauthorized');
        }
      }
    };

    fetchReports();
  }, [navigate]);


const [Volunteers,setVolunteers]=useState([]);
  const fetchVolunteers= async()=>{
    try{
        const res=await axios.get('http://localhost:5000/api/volunteers'
        );
        setVolunteers(res.data);
        if (res.data.length === 0) {
  console.log("No data found.");
}
    }
       catch(err){
        console.log("Could not find vounteers",err);
       } 
  }

  const [Disasters,setDisasters]=useState([]);
  const fetchDisasters= async()=>{
    try{
        const res=await axios.get('http://localhost:5000/api/disasters', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDisasters(res.data);
    }
       catch(err){
        console.log("Could not find disasters",err);
       } 
  }


    const links = [
    { text: 'About', href: '#', active: true },
    { text: 'Contact us', href: '#', disabled: false },
    { text: 'Sign in', href: '/login', disabled: false },
  ];
  const handleSearch = (e) => {
    e.preventDefault();
    alert('Search triggered!');
  };
  
  return (
    <div>
    {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>Reports</h1>
      <ul>
        {
            reports.map(report=>(
                <li key={report._id}>
                    <strong>{report.disasterType}</strong> at {report.location} by {report.reporterName}
                    <br/>
                    {report.description}
                </li>
            ))
        }
      </ul>
       <h1>See all the volunteers</h1>
       <button onClick={fetchVolunteers} style={{height:'30px',width:'150px'}}></button>
      <ul>
        {
            Volunteers.map(volunteer=>(
                <li key={volunteer._id}>
                    <strong>{volunteer.username}</strong> email {volunteer.email} with contact {volunteer.contact}
                    <br/>
                    {volunteer.description}
                </li>
            ))
        }
        </ul>
       <h1>See all the disasters</h1>
        <button onClick={fetchDisasters}></button>
         {Disasters.map((disaster) => (
        <div key={disaster._id}>
          <h3>{disaster.disasterType}</h3>
          <p>Location: {disaster.location}</p>
          <p>Status: {disaster.status}</p>

          {/* ✅ Link to Assign Volunteer page */}
          <Link to={`/assign-volunteer/${disaster._id}`}>
            <button>Assign Volunteer</button>
        
          </Link>
           <Link to={`/assign-item/${disaster._id}`}>
            <button>Assign Item</button>
        
          </Link>
           </div>
      ))}
  
    </div>
  )
}
export default NGOAdmin;
