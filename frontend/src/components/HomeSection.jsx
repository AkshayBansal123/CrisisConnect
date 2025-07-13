import React from 'react';
import heroImage from '../assets/disaster-response.png'; // Put your flood image here

const HomeSection = () => {
  return (
    <div>
      <section style={{ ...styles.hero, backgroundImage: `url(${heroImage})` }}>
        <div style={styles.overlay}>
          <h1 style={styles.heading}>Helping Hands in Times of Crisis</h1>
          <div style={styles.buttons}>
            <button style={styles.primaryBtn}>Latest updates</button>
            <button style={styles.secondaryBtn}>Disaster Map</button>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    height: '90vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: 'translateY(-50%)',
    color: 'white',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '40px',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    gap: '20px',
  },
  primaryBtn: {
    backgroundColor: '#0284c7',
    border: 'none',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  secondaryBtn: {
    backgroundColor: 'white',
    border: '2px solid #0284c7',
    color: '#0284c7',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default HomeSection;
