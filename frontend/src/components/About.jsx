import React from 'react';
import "../App.css";

const About = () => {
  return (
    <section id="about" className="section-container" style={{ borderTop: '1px solid #e2e8f0' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '60px', 
        alignItems: 'center' 
      }}>
        {/* Text Content */}
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            Designed for the Modern Physician
          </h2>
          <p style={{ color: '#475569', marginBottom: '1.2rem' }}>
            Physician burnout is at an all-time high, largely due to the administrative burden of EHR documentation.
          </p>
          <p style={{ color: '#475569', marginBottom: '2rem' }}>
            ScribeAI bridges the gap between human empathy and digital records. Our HIPAA-compliant 
            engine understands medical context, nuance, and terminology.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
               <span style={{ color: '#10b981' }}>✔</span> 99.8% Medical Accuracy
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
               <span style={{ color: '#10b981' }}>✔</span> Zero-Retention Privacy
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
               <span style={{ color: '#10b981' }}>✔</span> Instant EHR Sync
             </div>
          </div>
        </div>

        {/* Image Content */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="https://img.freepik.com/premium-vector/doctor-consult-patient-about-ehr-cellphone_140689-5945.jpg" 
            alt="Doctor and Patient Consultation Visualization" 
            style={{ 
              width: '100%', 
              maxWidth: '500px',
              height: 'auto', 
              borderRadius: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
            }} 
          />
        </div>
      </div>
    </section>
  );
};

export default About;