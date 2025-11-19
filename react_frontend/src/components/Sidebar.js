import React from "react";
import "./Sidebar.css";

/**
 * PUBLIC_INTERFACE
 * Sidebar - A persistent left sidebar for navigation/organization.
 * Now supports collapsible rail mode via `collapsed` prop from parent.
 *
 * Props:
 *   - collapsed (bool): whether the sidebar is collapsed.
 *   - onToggleCollapse (func): handler to toggle collapse state.
 */
function Sidebar({ collapsed = false, onToggleCollapse }) {
  // Minimal icon-like SVG or char fallback for demo; use library or real icons in production
  const icons = {
    all: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="4" y="6" width="14" height="2.4" rx="1.2" fill="#3b82f6"/><rect x="4" y="10" width="14" height="2.4" rx="1.2" fill="#3b82f6"/><rect x="4" y="14" width="14" height="2.4" rx="1.2" fill="#3b82f6"/></svg>
    ),
    fav: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 16.7l-5.2 3.08 1-5.85-4.2-4.09 5.82-.85L11 3.5l2.58 5.5 5.82.85-4.2 4.09 1 5.85-5.2-3.08z" fill="#f59e42"/></svg>
    ),
    archive: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="4" y="5" width="14" height="4" rx="2" fill="#a3a8ae"/><rect x="5.5" y="10" width="11" height="7" rx="2" fill="#e5e7eb"/><rect x="9" y="13" width="4" height="2" rx="1" fill="#93c5fd"/></svg>
    ),
    menu: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="6" y="7" width="10" height="2" rx="1" fill="#3b82f6"/><rect x="6" y="13" width="10" height="2" rx="1" fill="#3b82f6"/></svg>
    ),
    open: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.7 5.3a1 1 0 1 1 1.4 1.4L6.42 9.38a2 2 0 0 0 0 2.83l2.67 2.68a1 1 0 0 1-1.4 1.41l-3.5-3.5a1 1 0 0 1 0-1.41l3.5-3.5z" fill="#3b82f6"/></svg>
    ),
    close: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.3 5.3a1 1 0 0 0-1.41 1.4l2.68 2.7a2 2 0 0 1 0 2.83l-2.68 2.68a1 1 0 1 0 1.41 1.41l3.5-3.5a1 1 0 0 0 0-1.41l-3.5-3.5z" fill="#3b82f6"/></svg>
    ),
  };

  return (
    <nav className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar__header" style={{ justifyContent: "flex-start", gap: "0.6em" }}>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="sidebar__collapse-btn"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          tabIndex={0}
          style={{
            border: "none",
            background: "none",
            marginRight: collapsed ? 0 : "0.8em",
            padding: "0.1em",
            cursor: "pointer",
            outline: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          {collapsed ? icons.open : icons.close}
        </button>
        {!collapsed && <span className="sidebar__title">Menu</span>}
      </div>
      <ul className="sidebar__list">
        <li className={`sidebar__item sidebar__item--active`}>
          <span className="sidebar__item-icon">{icons.all}</span>
          {!collapsed && <span className="sidebar__item-label">All Notes</span>}
        </li>
        <li className="sidebar__item">
          <span className="sidebar__item-icon">{icons.fav}</span>
          {!collapsed && <span className="sidebar__item-label">Favorites</span>}
        </li>
        <li className="sidebar__item">
          <span className="sidebar__item-icon">{icons.archive}</span>
          {!collapsed && <span className="sidebar__item-label">Archive</span>}
        </li>
      </ul>
      <div className="sidebar__footer">
        {/* Show just version icon when collapsed */}
        {collapsed ? (
          <span className="sidebar__footer-icon" aria-label="version" title="v0.1">
            {icons.menu}
          </span>
        ) : (
          <span className="sidebar__footer-text">v0.1</span>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
