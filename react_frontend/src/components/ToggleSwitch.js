import React, { useRef } from "react";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * ToggleSwitch
 * An accessible, reusable toggle switch component (no CSS file, no external styles).
 *
 * Props:
 *   - checked: boolean (controlled mode, optional)
 *   - defaultChecked: boolean (uncontrolled mode, optional)
 *   - onChange: function(newChecked: boolean, event)
 *   - label: string (optional)
 *   - id: string (optional, for input element)
 *   - name: string (optional, for input element)
 *   - disabled: boolean (optional)
 *
 * Keyboard:
 *   - Toggle with Space/Enter
 * 
 * Accessibility:
 *   - role="switch"
 *   - aria-checked (dynamic)
 *   - forwards id and name to input if provided
 *   - tab focusable (on div) for custom rendering
 */
function ToggleSwitch({
  checked,
  defaultChecked,
  onChange,
  label,
  id,
  name,
  disabled = false,
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked || false
  );
  const switchRef = useRef(null);
  const effectiveChecked = isControlled ? checked : internalChecked;

  // PUBLIC_INTERFACE
  const handleToggle = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (!isControlled) {
      setInternalChecked((v) => !v);
    }
    if (onChange) {
      onChange(!effectiveChecked, event);
    }
  };

  // PUBLIC_INTERFACE
  const handleKeyDown = (event) => {
    if (
      event.key === " " ||
      event.key === "Spacebar" ||
      event.key === "Enter"
    ) {
      event.preventDefault();
      handleToggle(event);
    }
  };

  // Keyboard accessibility: forward focus to main switch area
  // Using <div> instead of <button> for custom switch, since button has default role (but could be done either way)
  return (
    <label
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.65 : 1,
        display: "inline-flex",
        alignItems: "center",
        userSelect: "none",
        fontSize: "16px",
        gap: "0.46em",
      }}
      htmlFor={id}
      {...props}
    >
      <div
        role="switch"
        aria-checked={!!effectiveChecked}
        tabIndex={disabled ? -1 : 0}
        ref={switchRef}
        aria-disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        style={{
          width: "36px",
          height: "20px",
          minWidth: "36px",
          background: effectiveChecked ? "#3b82f6" : "#e5e7eb",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          position: "relative",
          transition: "background 0.19s",
          boxSizing: "border-box",
          outline: "none",
          display: "inline-flex",
          alignItems: "center",
          verticalAlign: "middle",
        }}
        // Ensure focus outline for accessibility
        onFocus={e => { e.target.style.boxShadow = "0 0 2px 3px #2563eb55"; }}
        onBlur={e => { e.target.style.boxShadow = "none"; }}
      >
        <span
          style={{
            display: "block",
            width: "16px",
            height: "16px",
            background: "#fff",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: effectiveChecked ? "18px" : "2px",
            transform: "translateY(-50%)",
            transition: "left .17s cubic-bezier(.95,.15,.34,1.32)",
            boxShadow: "0 1.2px 2.4px #0002",
            border: "1.2px solid #e5e7eb",
          }}
          aria-hidden="true"
        />
      </div>
      {label && (
        <span
          style={{
            marginLeft: "0.28em",
            fontWeight: "400",
            color: "#22223b",
            fontSize: "15px",
          }}
        >
          {label}
        </span>
      )}
      {/* Hidden native checkbox to support forms if desired */}
      <input
        style={{ display: "none" }}
        type="checkbox"
        checked={!!effectiveChecked}
        onChange={(e) => {
          // Event for form libraries etc.
          handleToggle(e);
        }}
        id={id}
        name={name}
        tabIndex={-1}
        disabled={disabled}
        aria-hidden="true"
      />
    </label>
  );
}

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ToggleSwitch;
