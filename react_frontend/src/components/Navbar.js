import React, { useState } from 'react';
import Button from './Button';
import './Button.css';
import Dropdown from './Dropdown';
import './Dropdown.css';
import ToggleSwitch from './ToggleSwitch';

/**
 * PUBLIC_INTERFACE
 * Navbar - Top navigation bar component for the notes app
 * 
 * Displays the app title. Uses primary (#3b82f6) color for background accent.
 * Sticky at the top, minimal, modern style.
 * Contains "New Note" action button, a Dark Mode switch (placeholder), and an "Account" dropdown on the right.
 */
const Navbar = () => {
  // Placeholder handler for demo; to be replaced with actual modal or navigation in future.
  const handleNewNote = () => {
    // This could open a modal or route to "create note"
    alert("New Note action");
  };

  // Example dropdown items (replace with real menu/actions as needed)
  const accountItems = [
    { label: "Profile", value: "profile", onClick: () => alert("Go to Profile") },
    { label: "Settings", value: "settings", onClick: () => alert("Settings (demo)") },
    { label: "Sign out", value: "signout", onClick: () => alert("Sign out (demo)") }
  ];

  // State for the ToggleSwitch ("Dark Mode" placeholder, not wired to theme)
  const [darkChecked, setDarkChecked] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        Simple Notes
      </div>
      <div className="navbar__actions" style={{ marginLeft: "auto", display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
        <Button
          variant="primary"
          onClick={handleNewNote}
          aria-label="Create new note"
        >
          + New Note
        </Button>
        <ToggleSwitch
          checked={darkChecked}
          onChange={(checked, e) => setDarkChecked(checked)}
          leftLabel="Light"
          rightLabel="Dark"
          showLabels={true}
          labelPosition="inline"
          id="navbar-darkmode-switch"
          name="navbar-darkmode-switch"
          // not connected to actual theme, demonstrative only
        />
        <Dropdown
          label={<span style={{display:"flex",alignItems:"center"}}>Account</span>}
          items={accountItems}
          // onSelect={(val) => { }} // used only if specific item doesn't define its own onClick
          className="navbar__dropdown"
          menuClassName="navbar__dropdown-menu"
        />
      </div>
    </nav>
  );
};

export default Navbar;
