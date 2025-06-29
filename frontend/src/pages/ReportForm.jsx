import React, { useState } from 'react';
import axios from 'axios';

const ReportForm = () => {
  const [disasters, setDisasters] = useState([]);
  const [selectedDisasterId, setSelectedDisasterId] = useState('');
  const [newDisaster, setNewDisaster] = useState({
    title: '',
    location: '',
    description: '',
    createdBy:LocalStorage.getItem('userId'),
    assignedTo:null,
    status:'New'
  });
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/disasters', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDisasters(res.data);
      } catch (err) {
        console.error('Error fetching disasters:', err);
      }
    };

    fetchDisasters();
  }, []);
  const handleNewDisasterChange=e=>{
    setNewDisaster({...newDisaster, [e.target.name]: e.target.value});
  }
  const [form, setForm] = useState({
    reporterName: '',
    contact: '',
    location: '',
    disasterType: '',
    description: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    let disasterId = selectedDisasterId;

    try {
      // If user wants to create a new disaster first
      if (selectedDisasterId === 'new') {
        const res = await axios.post(
          'http://localhost:5000/api/disasters',
          newDisaster,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        disasterId = res.data._id;
      }

      const reportData = {
        ...form,
        disaster: disasterId,
        createdBy: localStorage.getItem('userId'),
      };

      await axios.post('http://localhost:5000/api/reports', reportData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Report submitted successfully!');
      setForm({
        reporterName: '',
        contact: '',
        location: '',
        description: '',
      });
      setSelectedDisasterId('');
    } catch (err) {
      console.error('Error submitting report:', err);
      alert('Failed to submit report.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report Disaster</h2>
      <input name="reporterName" placeholder="Your Name" onChange={handleChange} required />
      <input name="contact" placeholder="Contact Info" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <label>Select Existing Disaster or Create New:</label>
      <select
        value={selectedDisasterId}
        onChange={e => setSelectedDisasterId(e.target.value)}
        required
      ><option value="">-- Select --</option>
        {disasters.map(disaster => (
          <option key={disaster._id} value={disaster._id}>
            {disaster.title} — {disaster.location}
          </option>
        ))}
        <option value="new">Create New Disaster</option></select>
          {selectedDisasterId === 'new' && (
        <div>
          <h4>Create New Disaster</h4>
          <input
            name="title"
            placeholder="Disaster Title"
            value={newDisaster.title}
            onChange={handleNewDisasterChange}
            required
          />
          <input
            name="location"
            placeholder="Disaster Location"
            value={newDisaster.location}
            onChange={handleNewDisasterChange}
            required
          />
          <textarea
            name="description"
            placeholder="Disaster Description"
            value={newDisaster.description}
            onChange={handleNewDisasterChange}
            required
          />
        </div>
      )}
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;
