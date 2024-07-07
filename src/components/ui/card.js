import React from "react";
import "./card.css"; // Import CSS for card styles

export const Card = ({ children, className }) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

export const CardTitle = ({ children }) => (
  <div className="card-title">{children}</div>
);
