import React from 'react';
import "../App.css";
import { X, Home, Info, Activity, Layout, FileText, Mail } from 'lucide-react';

const Sidebar = ({ isOpen, close }) => {
  const links = [
    { name: 'Home', icon: <Home size={18}/>, href: "#home" },
    { name: 'About Us', icon: <Info size={18}/>, href: "#about" },
    { name: 'Services', icon: <Activity size={18}/>, href: "#services" },
    { name: 'Dashboard', icon: <Layout size={18}/>, href: "#dashboard" },
    { name: 'Transcripts', icon: <FileText size={18}/>, href: "#transcripts" },
    { name: 'Contact Us', icon: <Mail size={18}/>, href: "#contact" },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={close} />}
      <div className="sidebar" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Menu</h2>
          <X onClick={close} style={{ cursor: 'pointer', color: '#64748b' }} />
        </div>
        <nav>
          {links.map((link) => (
            <a key={link.name} href={link.href} className="sidebar-link" onClick={close}>
              <span style={{ marginRight: '12px', display: 'flex' }}>{link.icon}</span>
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;