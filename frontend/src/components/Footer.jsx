import React from 'react';
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'left' }}>
        <div>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>ScribeAI</h3>
          <p style={{ fontSize: '0.9rem' }}>Ambient intelligence for healthcare providers. Built for security, designed for speed.</p>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Compliance</h4>
          <ul style={{ listStyle: 'none', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Privacy Policy</li>
            <li>HIPAA Statement</li>
            <li>GDPR Ready</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Contact</h4>
          <p style={{ fontSize: '0.9rem' }}>support@scribeai.med</p>
          <p style={{ fontSize: '0.9rem' }}>+1 (555) 000-SCRIBE</p>
        </div>
      </div>
      <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #1e293b', fontSize: '0.85rem' }}>
        © 2025 ScribeAI Project. All HIPAA regulations applied.
      </div>
    </footer>
  );
};

export default Footer;