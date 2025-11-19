import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';
import { useTheme } from './ThemeContext';

// PUBLIC_INTERFACE
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="App" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar currentTheme={theme} onToggleTheme={toggleTheme} />
      <main className="app-main-content">
        <div className="app-content">
          <Sidebar />
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
