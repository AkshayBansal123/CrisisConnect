import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AssignItems = () => {
  const { disasterId } = useParams();
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState('');
  const [items,setItems]=useState([]);
  const token = localStorage.getItem('token');

  useEffect(()=>{
          const fetchItems = async()=>{
             
              try{
                console.log(token);
                  const res=await axios.get('http://localhost:5000/api/ngo/inventory'
                  )
                  setItems(res.data);
                  if (res.data && res.data.length === 0) {
  console.log('Inventory is empty');
}

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
     <h2>Assign items to disasters</h2>
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