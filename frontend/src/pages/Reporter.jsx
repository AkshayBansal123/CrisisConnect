import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import ReportForm from './ReportForm'
import Navbar from '../components/Navbar';
const Reporter = () => {
   const navigate = useNavigate();
  const [reports,setReports]=useState([]);
  const [error, setError] = useState('');
 
      useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || role !== 'reporter') {
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
      <Link to="/ReportForm"> Report new accident</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>See previous reports</h1>
      <ul>
        {
            reports.map(report=>(
                <li key={report._id}>
                    <strong>{report.disasterType}</strong>  at {report.location} by {report.reporterName}
                    <br/>
                    {report.description}
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default Reporter;
