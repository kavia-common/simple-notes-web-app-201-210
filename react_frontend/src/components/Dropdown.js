import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

/**
 * PUBLIC_INTERFACE
 * Dropdown - A reusable dropdown component.
 *
 * Props:
 *   - label: string or React node, the button/trigger content
 *   - items: array of { label, value } or { label, onClick }
 *   - onSelect: function(value | item), fires when an item is selected (unless item's own onClick used)
 *   - icon: optional, show icon with label (optional)
 *   - className: CSS classes for the root
 *   - menuClassName: CSS classes for the menu
 */
function Dropdown({
  label,
  items,
  onSelect,
  icon,
  className = "",
  menuClassName = "",
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(-1);
  const rootRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    function handler(e) {
      if (
        rootRef.current &&
        !rootRef.current.contains(e.target)
      ) {
        setOpen(false);
        setFocused(-1);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " " || e.key === "Spacebar")) {
        setOpen(true);
        setFocused(0);
        e.preventDefault();
        return;
      }
      if (!open) return;
      if (e.key === "ArrowDown") {
        setFocused(f => Math.min(items.length - 1, f + 1));
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setFocused(f => Math.max(0, f - 1));
        e.preventDefault();
      } else if (e.key === "Home") {
        setFocused(0); e.preventDefault();
      } else if (e.key === "End") {
        setFocused(items.length - 1); e.preventDefault();
      } else if (e.key === "Escape") {
        setOpen(false); setFocused(-1);
        e.preventDefault();
      } else if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        if (focused >= 0 && focused < items.length) {
          const item = items[focused];
          if (item.onClick) {
            item.onClick();
          } else if (onSelect) {
            onSelect(item.value ?? item);
          }
          setOpen(false);
          setFocused(-1);
        }
        e.preventDefault();
      }
    },
    [open, focused, items, onSelect]
  );

  const handleButtonClick = () => {
    setOpen(o => !o);
    setFocused(0);
  };

  const handleItemClick = (item, index) => {
    if (item.onClick) {
      item.onClick();
    } else if (onSelect) {
      onSelect(item.value ?? item);
    }
    setOpen(false);
    setFocused(-1);
  };

  return (
    <div
      className={`kavia-dropdown ${className}`}
      ref={rootRef}
      {...props}
    >
      <button
        type="button"
        className={`kavia-dropdown__button${open ? " kavia-dropdown__button--active" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {icon && <span className="kavia-dropdown__icon">{icon}</span>}
        <span>{label}</span>
        <span className="kavia-dropdown__arrow" aria-hidden="true">▼</span>
      </button>
      {open && (
        <ul
          className={`kavia-dropdown__menu ${menuClassName}`}
          role="menu"
          tabIndex={-1}
        >
          {items.map((item, idx) => (
            <li
              key={item.value ?? item.label ?? idx}
              className={`kavia-dropdown__item${focused === idx ? " focused" : ""}`}
              role="menuitem"
              tabIndex={-1}
              aria-selected={focused === idx}
              onClick={() => handleItemClick(item, idx)}
              onMouseEnter={() => setFocused(idx)}
              onMouseDown={e => e.preventDefault()}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  label: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.any,
      onClick: PropTypes.func,
    })
  ).isRequired,
  onSelect: PropTypes.func,
  icon: PropTypes.node,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
};

export default Dropdown;
