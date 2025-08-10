



import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
const AssignItems = () => {
     const {disasterId}= useParams();
      const navigate=useNavigate();
      const [items, setItems]= useState([]);
      const [selected,setSelected]= useState([]);
      useEffect(()=>{
        const fetchItems = async()=>{
            const token=localStorage.getItem('token');
            try{
                const res=await axios.get('http://localhost:5000/api/ngo/inventory'
                    
                )
                setItems(res.data);
                }
            catch(err){
                console.error(err);
                alert('Failed to fetch items');
            }
        }
        fetchItems();
    },[]);
         
    const handleSelect = (id)=>{
        setSelected(prev=> prev.includes(id) ? prev.filter(v=> v!=id) : [...prev,id]);
    }
    const handleSubmit = async()=>{
        const token=localStorage.getItem('token');
        try{
            await axios.post('http://localhost:5000/api/ngo/assignItems',{
                disasterId,
            itemIds: selected
    }
);
            alert(' Items assigned successfully');
            navigate('/ngo');
        }
        catch(err)
        {
            console.log(err);
        }
    };
  return (
    <div>
     <h2>Assign items to disasters</h2>
     {items.map((i)=>(
        <div key={i._id}>
        <label>
            <input type="checkbox"
            checked={selected.includes(i._id)}
            onChange={()=>handleSelect(i._id)}
            />
            {i.itemName} ({i.location})
        </label>
        </div>
     ))}
     <button onClick={handleSubmit}>Assign</button>
    </div>
  )
}

export default AssignItems;