import React from 'react'
import Dashboard from './pages/Dashboard'
import ReportForm from './pages/ReportForm'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/report" element={<ReportForm />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App

