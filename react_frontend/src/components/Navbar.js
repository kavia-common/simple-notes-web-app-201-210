import React from 'react';
import Button from './Button';
import './Button.css';

/**
 * PUBLIC_INTERFACE
 * Navbar - Top navigation bar component for the notes app
 * 
 * Displays the app title. Uses primary (#3b82f6) color for background accent.
 * Sticky at the top, minimal, modern style.
 * Contains "New Note" action button on the right.
 */
const Navbar = () => {
  // Placeholder handler for demo; to be replaced with actual modal or navigation in future.
  const handleNewNote = () => {
    // This could open a modal or route to "create note"
    alert("New Note action");
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        Simple Notes
      </div>
      <div className="navbar__actions" style={{ marginLeft: "auto" }}>
        <Button
          variant="primary"
          onClick={handleNewNote}
          aria-label="Create new note"
        >
          + New Note
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
