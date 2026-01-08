import React, { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import Sidebar from './Sidebar';
import "../App.css";

// Add { onStartSession } here inside the parentheses
const Navbar = ({ onStartSession }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={() => setIsOpen(true)} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Menu size={24} className="menu-icon" />
        </button>
        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginLeft: '10px' }}>
          ScribeAI
        </span>
      </div>

      <div className="tooltip-container" style={{ position: 'relative', display: 'inline-block' }}>
        <button 
          title="Start a new session"
          /* THIS IS THE REDIRECTION TRIGGER */
          onClick={onStartSession} 
          style={{ 
            background: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '50%', 
            width: '35px', 
            height: '35px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.nextSibling.style.opacity = '1';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.nextSibling.style.opacity = '0';
          }}
        >
          <Plus size={24} />
        </button>
        
        <span style={{
          opacity: '0',
          width: '140px',
          backgroundColor: '#1e293b',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '6px',
          padding: '5px 0',
          position: 'absolute',
          top: '45px',
          right: '0',
          fontSize: '0.75rem',
          transition: 'opacity 0.3s',
          pointerEvents: 'none'
        }}>
          Start a new session
        </span>
      </div>
      
      <Sidebar isOpen={isOpen} close={() => setIsOpen(false)} />
    </nav>
  );
};

export default Navbar;