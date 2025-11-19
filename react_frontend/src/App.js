import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import './components/Navbar.css';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';
import { useTheme } from './ThemeContext';

// PUBLIC_INTERFACE
function App() {
  const { theme, toggleTheme } = useTheme();

  // Manage sidebar collapse state here to allow layout adjustment
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleToggleSidebar = () => setSidebarCollapsed(c => !c);

  return (
    <div className="App" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar currentTheme={theme} onToggleTheme={toggleTheme} />
      <main className="app-main-content">
        <div className="app-content" style={{ transition: 'margin-left 0.22s cubic-bezier(.76,.2,.46,.97)' }}>
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />
          <aside
            className="app-list"
            style={{
              transition: 'margin-left 0.22s cubic-bezier(.76,.2,.46,.97)',
              marginLeft: sidebarCollapsed ? '-72px' : '0', // adjust if needed for minimal rail
            }}
          >
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
