import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{
          position: 'fixed',
          top: 16,
          right: 24,
          zIndex: 110
        }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <main className="app-main-content">
        {/* 
          Replace below with your <NotesList /> and <NoteDetail /> components as appropriate.
          Demo mock layout for content panes is given below.
        */}
        <div className="app-content">
          <aside className="app-list">
            {/* Replace with <NotesList /> */}
            <div className="app-list__demo">Notes List Pane</div>
          </aside>
          <section className="app-detail">
            {/* Replace with <NoteDetail /> */}
            <div className="app-detail__demo">Note Detail Pane</div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
