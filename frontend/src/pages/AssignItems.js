import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AssignItems = () => {
  const { disasterId } = useParams();
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(()=>{
          const fetchItems = async()=>{
              const token=localStorage.getItem('token');
              try{
                  const res=await axios.get('http://localhost:5000/api/admin/inventory',{
                      headers:{
                          Authorization:`Bearer ${token}`}
                      }
                  )
                  setItems(res.data);
                  }
              catch(err){
                  console.error(err);
                  alert('Failed to fetch volunteers');
              }
          }
          fetchItems();
      },[]);
           
      const handleSelect = (id)=>{
          setSelected(prev=> prev.includes(id) ? prev.filter(v=> v!=id) : [...prev,id]);
      }
      const handleSubmit = async()=>{
          const token=localStoreage.getItem('token');
          try{
              await axios.post('http://localhost:5000/api/disasters/assignItems',{
                  disasterId,
                  itemIds: selected
      },{
          headers:{Authorization: `Bearer %{token}`}
      }
  );
              alert('Items assigned successfully');
              navigate('/ngoadmin');
          }
          catch(err)
          {
              console.log(err);
          }
      };
  



  return (
       <div>
     <h2>Assign volunteers to disasters</h2>
     {items.map((i)=>(
        <div key={i._id}>
        <label>
            <input type="checkbox"
            checked={selected.includes(i._id)}
            onChange={()=>handleSelect(i._id)}
            />
            {i.name} ({i.quantity} {i.unit})
        </label>
        </div>
     ))}
     <button onClick={handleSubmit}>Assign</button>
    </div>
  );
};

export default AssignItems;