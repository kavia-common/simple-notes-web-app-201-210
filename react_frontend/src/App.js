import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import { useTheme } from './ThemeContext';

// PUBLIC_INTERFACE
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="App" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar currentTheme={theme} onToggleTheme={toggleTheme} />
      {/* Remove floating button; theme is toggled via Navbar switch */}
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
