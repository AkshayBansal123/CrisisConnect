import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useEffect } from 'react';
import axios from 'axios';
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
  return (
    <div>
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
