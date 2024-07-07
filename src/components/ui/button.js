import React from "react";
import "./button.css"; // Import CSS for button styles

export const Button = ({ children, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="button">
    {children}
  </button>
);
