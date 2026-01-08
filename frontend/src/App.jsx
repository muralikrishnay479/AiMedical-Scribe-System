import React, { useState } from 'react';
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import SessionConsole from "./components/SessionConsole";

function App() {
  // 1. Create the state to track which page to show
  const [isSessionActive, setIsSessionActive] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* 2. Pass the function to Navbar so it can change the state */}
      <Navbar onStartSession={() => setIsSessionActive(true)} />
      
      <main style={{ marginTop: '70px' }}>
        {/* 3. Conditional Rendering Logic */}
        {isSessionActive ? (
          /* Show Session Page */
          <SessionConsole onExit={() => setIsSessionActive(false)} />
        ) : (
          /* Show Landing Page */
          <>
            <Hero />
            <About />
            <Services />
            <ContactForm />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;