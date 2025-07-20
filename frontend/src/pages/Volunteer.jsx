import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
const Volunteer = () => {
  const navigate = useNavigate();
  const [reports,setReports]=useState([]);
  const [error, setError] = useState('');
 
      useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || role !== 'volunteer') {
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
     <Navbar brand="CRISISCONNECT" links={links} onSearch={handleSearch} />
      <h1>See assigned incidents</h1>
      <div>
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
        
      </div>
    </div>
  )
}

export default Volunteer
