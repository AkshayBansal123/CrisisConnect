import React from 'react'
import Volunteer from './pages/Volunteer'
import NGOAdmin from './pages/NGOAdmin'
import Inventory from './pages/Inventory'
import InventoryForm from './pages/InventoryForm'
import Reporter from './pages/Reporter'
import ReportForm from './pages/ReportForm'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AssignVolunteer from './pages/AssignVolunteer'
import AssignItems from './pages/AssignItems'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      f
        <Route path="/reportForm" element={<ReportForm />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route
    path="/volunteer"
    element={
      <ProtectedRoute requiredRole="volunteer">
        <Volunteer/>
      </ProtectedRoute>
    }
  />
        <Route path="/reporter" element={<Reporter/>} />
          <Route path="/ngo" element={<NGOAdmin/>} />
          <Route path="/inventory" element={<Inventory/>} />
           <Route path="/inventoryForm" element={<InventoryForm/>} />
             <Route path="/assign-volunteer/:disasterId" element={<AssignVolunteer />} />
               <Route path="/assign-item/:disasterId" element={<AssignItems/>} />
      </Routes>
    </Router>
  )
}

export default App

