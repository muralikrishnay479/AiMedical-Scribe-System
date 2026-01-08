import React from 'react';
import "../App.css";

const Services = () => {
  return (
    <section id="services" className="section-container">
      <h2 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem'}}>Our Core Services</h2>
      <div className="services-grid">
        <div className="card">
          <h3 style={{color: '#2563eb', marginBottom: '10px'}}>AI SOAP Notes</h3>
          <p>Automated generation of Subjective, Objective, Assessment, and Plan notes directly from patient encounters.</p>
        </div>
        <div className="card">
          <h3 style={{color: '#2563eb', marginBottom: '10px'}}>Ambient Listening</h3>
          <p>Natural conversation capture that filters out small talk and focuses on medical relevance.</p>
        </div>
        <div className="card">
          <h3 style={{color: '#2563eb', marginBottom: '10px'}}>EHR Integration</h3>
          <p>Seamlessly sync completed notes to Epic, Cerner, and Athena with a single click.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;