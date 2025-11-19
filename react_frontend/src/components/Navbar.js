import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './Button.css';
import Dropdown from './Dropdown';
import './Dropdown.css';
import ToggleSwitch from './ToggleSwitch';

/**
 * PUBLIC_INTERFACE
 * Navbar - Top navigation bar component for the notes app
 * 
 * Now accepts flexible props for branding, toggles, actions, and menu customization.
 *
 * Props:
 *   - title: string (for brand/title area, default "Simple Notes")
 *   - showSearch: boolean (show a search box, default false)
 *   - onSearch: function (handler for search event, receives search string)
 *   - showNewNote: boolean (show "+ New Note" button, default true)
 *   - onNewNote: function (handler for "New Note" button, default demo alert)
 *   - menuItems: array of {label, onClick}, for dropdown menu (default to Account menu)
 *   - showToggle: boolean (show mode toggle, default true)
 *   - toggleChecked: boolean (toggle checked state for controlled mode)
 *   - onToggleChange: function (handler for toggle, receives checked state)
 *   - currentTheme: string ("light"|"dark"; for legacy, maps to toggle)
 *   - onToggleTheme: function (legacy, maps to onToggleChange)
 *   - rightActions: React node(s) (additional elements/actions on the right)
 */
const Navbar = ({
  title = "Simple Notes",
  showSearch = false,
  onSearch,
  showNewNote = true,
  onNewNote,
  menuItems,
  showToggle = true,
  toggleChecked,
  onToggleChange,
  currentTheme, // legacy, maps to toggleChecked if not provided
  onToggleTheme, // legacy, maps to onToggleChange if not provided
  rightActions
}) => {
  // Basic defaults for missing handlers, for compatibility
  const handleNewNote =
    onNewNote ||
    (() => {
      alert("New Note action");
    });

  // Default Account menu items, if none provided
  const accountItemsDefault = [
    { label: "Profile", value: "profile", onClick: () => alert("Go to Profile") },
    { label: "Settings", value: "settings", onClick: () => alert("Settings (demo)") },
    { label: "Sign out", value: "signout", onClick: () => alert("Sign out (demo)") }
  ];
  const menuItemsToUse = Array.isArray(menuItems) && menuItems.length > 0 ? menuItems : accountItemsDefault;

  // Theme toggle handling (controlled by toggleChecked/onToggleChange preferred, or by legacy props)
  let toggleValue, toggleHandler;
  if (typeof toggleChecked === 'boolean') {
    toggleValue = toggleChecked;
    toggleHandler = onToggleChange;
  } else if (typeof currentTheme === 'string') {
    toggleValue = currentTheme === 'dark';
    toggleHandler = onToggleTheme;
  } else {
    toggleValue = false;
    toggleHandler = undefined;
  }
  // If no onToggleChange or onToggleTheme is provided, fallback does nothing.

  // Search handling
  const searchInputRef = useRef();

  const handleSearchSubmit = e => {
    e.preventDefault();
    const val = searchInputRef.current ? searchInputRef.current.value : '';
    if (typeof onSearch === "function") {
      onSearch(val);
    }
  };

  return (
    <nav className="navbar">
      {/* Brand/Title Area */}
      <div className="navbar__brand">
        {title}
      </div>

      {/* Optional: Search */}
      {showSearch && (
        <form
          className="navbar__search"
          onSubmit={handleSearchSubmit}
          style={{
            marginLeft: "1.7rem",
            display: "flex",
            alignItems: "center"
          }}
        >
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search notes..."
            aria-label="Search notes"
            style={{
              padding: "0.41em 1em",
              fontSize: "1.04rem",
              borderRadius: 6,
              border: "1.5px solid #bfcaf5",
              marginRight: "0.68em",
              minWidth: 120
            }}
            defaultValue=""
          />
          <Button
            variant="default"
            type="submit"
            style={{
              minWidth: 32,
              padding: "0.32em 1.07em"
            }}
            aria-label="Submit search"
          >🔍</Button>
        </form>
      )}

      {/* Navbar Actions: align right */}
      <div className="navbar__actions" style={{ marginLeft: "auto", display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
        {/* New Note button */}
        {showNewNote && (
          <Button
            variant="primary"
            onClick={handleNewNote}
            aria-label="Create new note"
          >
            + New Note
          </Button>
        )}

        {/* ToggleSwitch for light/dark/etc */}
        {showToggle && (
          <ToggleSwitch
            checked={!!toggleValue}
            onChange={
              typeof toggleHandler === "function"
                ? (checked, e) => toggleHandler(checked, e)
                : undefined
            }
            leftLabel="Light"
            rightLabel="Dark"
            showLabels={true}
            labelPosition="inline"
            id="navbar-darkmode-switch"
            name="navbar-darkmode-switch"
            aria-label={toggleValue ? "Switch to light mode" : "Switch to dark mode"}
          />
        )}

        {/* Menu: Dropdown */}
        <Dropdown
          label={<span style={{display:"flex",alignItems:"center"}}>Account</span>}
          items={menuItemsToUse}
          className="navbar__dropdown"
          menuClassName="navbar__dropdown-menu"
        />

        {/* Optional right-side additional actions */}
        {rightActions && rightActions}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  showSearch: PropTypes.bool,
  onSearch: PropTypes.func,
  showNewNote: PropTypes.bool,
  onNewNote: PropTypes.func,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func
    })
  ),
  showToggle: PropTypes.bool,
  toggleChecked: PropTypes.bool,
  onToggleChange: PropTypes.func,
  currentTheme: PropTypes.oneOf(["light", "dark"]),
  onToggleTheme: PropTypes.func,
  rightActions: PropTypes.node
};

export default Navbar;
