import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

/**
 * PUBLIC_INTERFACE
 * Button
 * A versatile, theme-matching button for actions like "New Note".
 * 
 * Props:
 *   - children: Button label or content (required)
 *   - variant: "primary" (default, blue), "success" (accent/cyan), or "default"
 *   - onClick: Click handler function
 *   - type: Button type ("button", "submit")
 *   - className: Extra CSS classes
 *   - style: Inline style
 *   - ...props: Other native button props (e.g., aria-*)
 */
function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  style,
  ...props
}) {
  const variantClass = `btn-${variant}`;
  return (
    <button
      type={type}
      className={`kavia-btn ${variantClass} ${className}`}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "success", "default"]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  style: PropTypes.object
};

export default Button;
