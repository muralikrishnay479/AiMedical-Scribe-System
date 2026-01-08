/* Hero.jsx */
import "../App.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-badge">AI-Powered Clinical Documentation</div>
      <h1>Focus on your Patients. <br /> <span style={{color: '#2563eb'}}>We'll handle the notes.</span></h1>
      <p style={{maxWidth: '700px', margin: '0 auto 30px', color: '#475569', fontSize: '1.2rem'}}>
        Our AI Medical Scribe captures ambient clinical conversations and converts them into structured SOAP notes in real-time.
      </p>
      <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
         <button className="btn-primary" style={{width: 'auto'}}>Get Started Free</button>
         <button className="btn-primary" style={{width: 'auto', background: '#f1f5f9', color: '#1e293b'}}>Watch Demo</button>
      </div>
    </section>
  );
};

export default Hero;