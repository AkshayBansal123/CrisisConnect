import React, { useState } from 'react';
import axios from 'axios';

const InventoryForm = () => {
  const userid=localStorage.getItem('userId');
  const [product, setProduct] = useState({
        itemName:'',
        provider:userid,
        location:'',
        quantity:0,
        unit:'',
        description:'',
        status:'Available',
        assignedTo:null,
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reports', form);
      alert('Product created');
    } catch (err) {
      console.error(err);
      alert('Failed to create');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
              <label htmlFor="itemname" className="form-label">itemName</label>
                <input type="text" id="itemname"
        className="form-control"
        placeholder="Enter the itemname"  onchange={handleChange}
        required></input>
                <label htmlFor="password" className="form-label">Location</label>
                <input type="text" id="password"
        className="form-control"
        placeholder="Enter the storage location" onchange={handleChange}
        required></input>
                <label htmlFor="password" className="form-label">Quantity</label>
                <input type="number" id="password"
        className="form-control"
        placeholder="Enter the quantity" onchange={handleChange}
        required></input>
        <label htmlFor="password" className="form-label">Unit</label>
                <input type="text" id="password"
        className="form-control"
        placeholder="Enter the measuring unit" onchange={handleChange}
        required></input>
        <label htmlFor="password" className="form-label">Description</label>
                <input type="text" id="password"
        className="form-control"
        placeholder="Describe the item" onchange={handleChange}
        required></input>
        <label htmlFor="password" className="form-label">Description</label>
                <input type="text" id="password"
        className="form-control"
        placeholder="Describe the item" onchange={handleChange}
        required></input>
        <label htmlFor="password" className="form-label">Status</label>
        <select
  name="status"
  value={product.status}
  onChange={handleChange}
  required
>
  <option value="Available">Available</option>
  <option value="Assigned">Assigned</option>
  <option value="Out of Stock">Out of Stock</option>
</select>
 <label htmlFor="password" className="form-label">Assigned to</label>
                <input type="text" id="password"
        className="form-control"
        placeholder="Where the item is assigned" onchange={handleChange}
        ></input>

                     <button className='btn-primary' type="submit">Submit Report</button>
              </form>
   
  );
};

export default InventoryForm;