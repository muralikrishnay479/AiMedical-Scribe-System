import React, { useState, useEffect, useRef } from 'react';
import { Mic, Pause, Play, Square, X, FileText, Wand2, FileJson, Loader2 } from 'lucide-react';
import ClinicalReport from './ClinicalReport';
import "../App.css";
import { analyzeAudio } from '../api';

const SessionConsole = ({ onExit }) => {
  // State for recording
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [seconds, setSeconds] = useState(0);

  // State for analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [error, setError] = useState(null);

  // Ref to target the report section for scrolling
  const reportRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerIntervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isRecording, isPaused]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [mediaRecorder]);


  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      setMediaRecorder(recorder);
      setAudioChunks([]);
      setError(null);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((current) => [...current, event.data]);
        }
      };

      recorder.start();
      setIsRecording(true);
      setIsPaused(false);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access microphone. Please check permissions.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      setIsPaused(true);
    } else if (mediaRecorder && mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false); // Stop the UI state immediately
      setIsPaused(false);
    }
  };


  const handleGenerateReport = async () => {
    if (audioChunks.length === 0 && !conversation.length) {
      if (isRecording) stopRecording();
      // Wait a tiny bit for the last chunk? Realistically, users should stop first. 
      // But if they click generate while recording, we handle it:
      // However, mediaRecorder.stop() is async in terms of the 'stop' event firing.
      // For simplicity, let's enforce stopping first or handle it better in v2.
      // Here we assume the user has stopped or we just use what we have if the recorder fires data.
    }

    // Create blob
    if (audioChunks.length === 0) return;

    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeAudio(audioBlob);
      setConversation(data.dialogue || []);
      setReportData(data.soap_note);

      setShowReport(true);
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);

    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to analyze audio. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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

          {error && (
            <div style={{ padding: '10px', background: '#fee2e2', color: '#ef4444', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

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
              <span style={{ color: '#94a3b8' }}>{isPaused ? "Paused" : (audioChunks.length > 0 ? "Recording Captured" : "Ready")}</span>
            )}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', fontFamily: 'monospace', color: '#1e293b' }}>
              {formatTime(seconds)}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
            {!isRecording && audioChunks.length === 0 ? (
              <button className="record-btn start" onClick={startRecording}><Mic size={24} /></button>
            ) : isRecording ? (
              <>
                <button className="record-btn pause" onClick={pauseRecording}>
                  {isPaused ? <Play size={24} /> : <Pause size={24} />}
                </button>
                <button className="record-btn stop" onClick={stopRecording}>
                  <Square size={24} />
                </button>
              </>
            ) : (
              <button className="record-btn stop" style={{ background: '#cbd5e1' }} onClick={() => { setAudioChunks([]); setSeconds(0); }}>
                <X size={24} />
              </button> // Clear recording
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
              {isAnalyzing ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>
                  <Loader2 size={40} className="animate-spin" />
                  <p style={{ marginTop: '20px' }}>Analyzing conversation...</p>
                </div>
              ) : (conversation.length > 0) ? (
                conversation.map((chat, i) => (
                  <div key={i} style={{ alignSelf: chat.speaker === 'Doctor' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', marginBottom: '4px', textAlign: chat.speaker === 'Doctor' ? 'left' : 'right' }}>{chat.speaker}</p>
                    <div style={{
                      fontSize: '0.95rem',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      background: chat.speaker === 'Doctor' ? '#f1f5f9' : '#2563eb',
                      color: chat.speaker === 'Doctor' ? '#1e293b' : '#fff'
                    }}>
                      {chat.text}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '150px', fontStyle: 'italic' }}>
                  {audioChunks.length > 0 ? "Recording finished. Click 'Generate Report' to analyze." : "Start recording to begin transcribing."}
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '15px', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
              <button
                className="action-btn"
                disabled={isRecording || isAnalyzing || audioChunks.length === 0}
                onClick={handleGenerateReport}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '600', cursor: (isRecording || isAnalyzing || audioChunks.length === 0) ? 'not-allowed' : 'pointer', opacity: (isRecording || isAnalyzing || audioChunks.length === 0) ? 0.6 : 1 }}
              >
                <FileJson size={18} /> Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER REPORT TARGET */}
      {showReport && reportData && (
        <div ref={reportRef} style={{ marginTop: '50px' }}>
          <ClinicalReport data={reportData} />
        </div>
      )}
    </div>
  );
};

export default SessionConsole;