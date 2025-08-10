




import React, { useState } from 'react';
import axios from 'axios';

const InventoryForm = () => {
  const userid = localStorage.getItem('userId');
  const [item, setItem] = useState({
    itemName: '',
    provider: userid,
    location: '',
    quantity: 0,
    unit: '',
    description: '',
    status: 'Available',
    assignedDisaster: null
  });

  const handleChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleAddItem = async e => {
    e.preventDefault();
    try {
      console.log(item);
      if(item.assignedDisaster==='')
        item.assignedDisaster=null
      await axios.post('http://localhost:5000/api/ngo/inventory', item);
      alert('Product created');
    } catch (err) {
      console.error(err);
      alert('Failed to create');
    }
  };

  return (
    <form onSubmit={handleAddItem}>
      <label htmlFor="itemName" className="form-label">Item Name</label>
      <input
        type="text"
        id="itemName"
        name="itemName"
        className="form-control"
        placeholder="Enter the item name"
        onChange={handleChange}
        required
      />

      <label htmlFor="location" className="form-label">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        className="form-control"
        placeholder="Enter the storage location"
        onChange={handleChange}
        required
      />

      <label htmlFor="quantity" className="form-label">Quantity</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        className="form-control"
        placeholder="Enter the quantity"
        onChange={handleChange}
        required
      />

      <label htmlFor="unit" className="form-label">Unit</label>
      <input
        type="text"
        id="unit"
        name="unit"
        className="form-control"
        placeholder="Enter the measuring unit"
        onChange={handleChange}
        required
      />

      <label className="form-label">Status</label>
      <div>
        <label>
          <input
            type="radio"
            name="status"
            value="Available"
            checked={item.status === "Available"}
            onChange={handleChange}
          /> Available
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="Assigned"
            checked={item.status === "Assigned"}
            onChange={handleChange}
          /> Assigned
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="Out of stock"
            checked={item.status === "Out of stock"}
            onChange={handleChange}
          /> Out of stock
        </label>
      </div>

      <label htmlFor="description" className="form-label">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        className="form-control"
        placeholder="Describe the item"
        onChange={handleChange}
        required
      />

      <label htmlFor="assignedTo" className="form-label">Assigned to</label>
      <input
        type="text"
        id="assignedTo"
        name="assignedDisaster"
        className="form-control"
        placeholder="Where the item is assigned"
        onChange={handleChange}
      />

      <button className="btn btn-primary mt-3" type="submit">Submit Report</button>
    </form>
  );
};

export default InventoryForm;
