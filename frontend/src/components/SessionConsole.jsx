import React, { useState, useEffect, useRef } from 'react';
import { Mic, Pause, Play, Square, X, FileText, Wand2, FileJson } from 'lucide-react';
import ClinicalReport from './ClinicalReport'; 
import "../App.css";

const SessionConsole = ({ onExit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showReport, setShowReport] = useState(false);
  
  // Ref to target the report section for scrolling
  const reportRef = useRef(null);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Scroll function
  const handleGenerateReport = () => {
    setShowReport(true);
    // Timeout ensures the component renders before the scroll happens
    setTimeout(() => {
      reportRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Simulated live conversation data
  const conversation = [
    { role: 'Doctor', text: "Hello, what brings you in today?" },
    { role: 'Patient', text: "I've been having persistent headaches for the last three days." },
    { role: 'Doctor', text: "Are you experiencing any light sensitivity or nausea?" },
    { role: 'Patient', text: "Yes, especially in the mornings. It's quite debilitating." },
    { role: 'Doctor', text: "Okay. We'll look into that. Any other symptoms?" }
  ];

  return (
    <div style={{ paddingBottom: '100px' }}>
      <div className="section-container" style={{ 
        display: 'flex', 
        gap: '30px', 
        marginTop: '40px', 
        minHeight: '80vh',
        alignItems: 'stretch' 
      }}>
        
        {/* LEFT PANEL: Recording & Controls */}
        <div style={{ 
          flex: '0 0 380px', 
          background: '#fff', 
          padding: '30px', 
          borderRadius: '24px', 
          border: '1px solid #e2e8f0', 
          height: 'fit-content',
          position: 'sticky',
          top: '100px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Live Recording</h2>
          
          <div className="voice-visualizer-box" style={{ 
            height: '100px', 
            background: '#f8fafc', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '4px', 
            marginBottom: '20px',
            border: '1px inset #f1f5f9' 
          }}>
            {isRecording && !isPaused ? (
              [...Array(15)].map((_, i) => (
                <div key={i} className="voice-bar" style={{ animationDelay: `${i * 0.07}s` }}></div>
              ))
            ) : (
              <span style={{ color: '#94a3b8' }}>{isPaused ? "Paused" : "Ready"}</span>
            )}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', fontFamily: 'monospace', color: '#1e293b' }}>
              {formatTime(seconds)}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
            {!isRecording ? (
              <button className="record-btn start" onClick={() => setIsRecording(true)}><Mic size={24} /></button>
            ) : (
              <>
                <button className="record-btn pause" onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? <Play size={24} /> : <Pause size={24} />}
                </button>
                <button className="record-btn stop" onClick={() => { setIsRecording(false); setIsPaused(false); }}>
                  <Square size={24} />
                </button>
              </>
            )}
          </div>

          <button onClick={onExit} style={{ width: '100%', padding: '12px', border: '1px solid #fee2e2', color: '#ef4444', background: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}>
            <X size={16} /> Discard Session
          </button>
        </div>

        {/* RIGHT PANEL: Transcript */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <div style={{ 
            padding: '25px', 
            background: '#ffffff', 
            borderRadius: '24px', 
            border: '1px solid #e2e8f0', 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '600px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <FileText size={20} color="#2563eb" />
              <h3 style={{ fontSize: '1.1rem' }}>Real-time Transcript</h3>
            </div>
            
            <div style={{ flex: '1', overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {(isRecording || seconds > 0) ? (
                conversation.map((chat, i) => (
                  <div key={i} style={{ alignSelf: chat.role === 'Doctor' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
                     <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', marginBottom: '4px', textAlign: chat.role === 'Doctor' ? 'left' : 'right' }}>{chat.role}</p>
                    <div style={{ 
                      fontSize: '0.95rem', 
                      padding: '12px 16px', 
                      borderRadius: '16px', 
                      background: chat.role === 'Doctor' ? '#f1f5f9' : '#2563eb', 
                      color: chat.role === 'Doctor' ? '#1e293b' : '#fff' 
                    }}>
                      {chat.text}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '150px', fontStyle: 'italic' }}>
                  The transcript will generate automatically once the recording starts.
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '15px', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
              <button 
                className="action-btn" 
                disabled={isRecording} 
                onClick={handleGenerateReport}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600', cursor: isRecording ? 'not-allowed' : 'pointer' }}
              >
                <FileJson size={18} /> Generate Report
              </button>
              <button 
                className="action-btn-primary" 
                disabled={isRecording} 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: isRecording ? 'not-allowed' : 'pointer' }}
              >
                <Wand2 size={18} /> Generate Summary
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER REPORT TARGET */}
      {showReport && (
        <div ref={reportRef} style={{ marginTop: '50px' }}>
          <ClinicalReport />
        </div>
      )}
    </div>
  );
};

export default SessionConsole;