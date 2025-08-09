import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import { login } from "../../api/authApi";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [erroMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";
  const inputBg = isDark ? "bg-secondary text-light border-0" : "";

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData);
      if (response.status === 200) {
        const data = response.data;
        const user = data.data;
        console.log(user);

        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Logged in successfully! Redirecting...", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          onClose: () => {
            navigate("/");
            window.location.reload();
          },
        });
      }
    } catch (error) {
      setErrorMsg(error.message);
      toast.error(error.message || "Login failed. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div
        className={`login-card p-4 rounded shadow ${bgClass}`}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Login to NotesHub</h3>

        {erroMsg && (
          <div
            className="alert alert-danger text-center py-2 mt-2"
            role="alert"
          >
            {erroMsg}
          </div>
        )}

        <form id="loginForm" onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username or Email
            </label>
            <input
              type="text"
              className={`form-control ${inputBg}`}
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${inputBg}`}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className={`btn btn-primary ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div id="loginMsg" className="mt-3 text-center text-success d-none">
          Logged in successfully! Redirecting...
        </div>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-underline text-info">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
