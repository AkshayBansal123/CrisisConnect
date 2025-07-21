import React from 'react'
 import Navbar from '../components/Navbar';
import {Link} from 'react-router-dom';
import InventoryForm from './InventoryForm';
import {useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Inventory = () => {
    const navigate = useNavigate();
    const [inventory,setInventory]=useState([]);
    const [error, setError] = useState('');
   
        useEffect(() => {
      const showInventory = async () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
  
        if (!token || role !== 'ngoadmin') {
          navigate('/login'); 
          return;
        }
  
        try {
          const res = await axios.get('http://localhost:5000/api/ngo/inventory', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setInventory(res.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Something went wrong');
          if (err.response?.status === 401 || err.response?.status === 403) {
            navigate('/unauthorized');
          }
        }
      };
  
      showInventory();
    }, [navigate]);
 ;
  return (
    <div>
     <Link to="/InventoryForm"> Report new accident</Link>
      <ul>
      {
        inventory.map((item)=>(
          <li key={item._id}>
            <h3>{item.itemName}</h3>
            <p>Provider: {item.provider}</p>
            <p>Location: {item.location}</p>
            <p>Quantity: {item.quantity} {item.unit}</p>
            <p>Description: {item.description}</p>
            <p>Status: {item.status}</p>
            {item.assignedDisaster && <p>Assigned To: {item.assignedDisaster}</p>}
            <p>Last Updated: {new Date(item.lastUpdated).toLocaleDateString()}</p>
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default Inventory
