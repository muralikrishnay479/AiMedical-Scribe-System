import React from 'react';
import "../App.css";
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactForm = () => {
  return (
    <section id="contact" className="section-container" style={{ backgroundColor: '#f8fafc', borderRadius: '32px', margin: '40px auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#0f172a' }}>Get in Touch</h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Have questions about ScribeAI? Reach out to our team directly.</p>
      </div>

      <div className="services-grid">
        {/* Email Contact */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ background: '#eff6ff', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Mail className="text-blue-600" size={24} style={{color: '#2563eb'}} />
          </div>
          <h3 style={{ marginBottom: '10px' }}>Email Us</h3>
          <p style={{ color: '#475569', fontWeight: '500' }}>scribeai.med@gmail.com</p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Support available 24/7</p>
        </div>

        {/* Phone Contact */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ background: '#eff6ff', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Phone className="text-blue-600" size={24} style={{color: '#2563eb'}} />
          </div>
          <h3 style={{ marginBottom: '10px' }}>Call Us</h3>
          <p style={{ color: '#475569', fontWeight: '500' }}>+91 7995971479-SCRIBE</p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Mon-Fri, 9am - 6pm </p>
        </div>

        {/* Office Location */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ background: '#eff6ff', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <MapPin className="text-blue-600" size={24} style={{color: '#2563eb'}} />
          </div>
          <h3 style={{ marginBottom: '10px' }}>Our Office</h3>
          <p style={{ color: '#475569', fontWeight: '500' }}>123 Health-Tech Plaza</p>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Silicon Valley, CA 94025</p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;