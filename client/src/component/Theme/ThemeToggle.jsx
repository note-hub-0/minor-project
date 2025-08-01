import React from "react";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm position-fixed rounded-circle shadow"
      style={{
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: theme === "dark" ? "#f8f9fa" : "#212529",
        color: theme === "dark" ? "#212529" : "#f8f9fa",
      }}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <i className="fas fa-moon"></i>
      ) : (
        <i className="fas fa-sun"></i>
      )}
    </button>
  );
}
