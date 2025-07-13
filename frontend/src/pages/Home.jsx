import React from 'react'
import HomeSection from '../components/HomeSection';
import Navbar from '../components/Navbar';
const Home = () => {
   const links = [
    { text: 'About', href: '#', active: true },
    { text: 'Contact us', href: '#', disabled: false },
    { text: 'Sign in', href: '/login', disabled: false },
  ];
  const handleSearch = (e) => {
    e.preventDefault();
    alert('Search triggered!');
  };
  return (
    <div>
      <Navbar brand="CRISISCONNECT" links={links} onSearch={handleSearch} />
      <HomeSection/>
    </div>
  )
}

export default Home
