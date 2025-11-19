import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Navbar - Top navigation bar component for the notes app
 * 
 * Displays the app title. Uses primary (#3b82f6) color for background accent.
 * Sticky at the top, minimal, modern style.
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        Simple Notes
      </div>
      {/* Future: Action buttons or user menu could go here */}
    </nav>
  );
};

export default Navbar;
