import React from "react";
import "./Sidebar.css";

/**
 * PUBLIC_INTERFACE
 * Sidebar - A persistent left sidebar for navigation/organization.
 * Minimal structure: app title, section links (placeholders).
 * No props.
 */
function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__title">Menu</span>
      </div>
      <ul className="sidebar__list">
        <li className="sidebar__item sidebar__item--active">
          <span>All Notes</span>
        </li>
        <li className="sidebar__item">
          <span>Favorites</span>
        </li>
        <li className="sidebar__item">
          <span>Archive</span>
        </li>
      </ul>
      {/* Minimal - add more sections/categories as needed */}
      <div className="sidebar__footer">
        <span className="sidebar__footer-text">v0.1</span>
      </div>
    </nav>
  );
}

export default Sidebar;
