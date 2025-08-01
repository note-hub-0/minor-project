import React from "react";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import { NavLink } from "react-router";
import { useAuth } from "../../Hooks/CustomeHooks/useAuth";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const {user} = useAuth();
  

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark"
          ? "navbar-light bg-light text-dark"
          : "navbar-dark bg-dark text-light"
      } sticky-top shadow-sm`}
    >
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          NotesHub
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/notes"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                }
              >
                Browse Notes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                }
              >
                Upload Notes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center">

            { user ?
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className="nav-link profile"
                  
                >
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "35px", height: "35px" }}
                  />
                </NavLink>
              </li>
              :
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-warning fw-bold me-3">
                Login / Signup
              </NavLink>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
