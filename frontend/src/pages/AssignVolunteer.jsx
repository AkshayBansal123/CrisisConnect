import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
const AssignVolunteer = () => {
     const {disasterId}= useParams();
      const navigate=useNavigate();
      const [volunteers, setVolunteers]= useState([]);
      const [selected,setSelected]= useState([]);
      useEffect(()=>{
        const fetchVolunteers = async()=>{
            const token=localStorage.getItem('token');
            try{
                const res=await axios.get('http://localhost:5000/api/volunteers',{
                    headers:{
                        Authorization:`Bearer ${token}`}
                    }
                )
                setVolunteers(res.data);
                }
            catch(err){
                console.error(err);
                alert('Failed to fetch volunteers');
            }
        }
        fetchVolunteers();
    },[]);
         
    const handleSelect = (id)=>{
        setSelected(prev=> prev.includes(id) ? prev.filter(v=> v!=id) : [...prev,id]);
    }
    const handleSubmit = async()=>{
        const token=localStorage.getItem('token');
        try{
            await axios.post('http://localhost:5000/api/ngo/assignVols/assign',{
                disasterId,
                volunteerIds: selected
    }
);
            alert('Volunteers assigned successfully');
            navigate('/ngo');
        }
        catch(err)
        {
            console.log(err);
        }
    };
  return (
    <div>
     <h2>Assign volunteers to disasters</h2>
     {volunteers.map((v)=>(
        <div key={v._id}>
        <label>
            <input type="checkbox"
            checked={selected.includes(v._id)}
            onChange={()=>handleSelect(v._id)}
            />
            {v.username} ({v.email})
        </label>
        </div>
     ))}
     <button onClick={handleSubmit}>Assign</button>
    </div>
  )
}

export default AssignVolunteer;








