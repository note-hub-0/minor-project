import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import { signup } from "../../api/authApi"; // ✅ Replace with your signup API

export default function Signup() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";
  const inputBg = isDark ? "bg-secondary text-light border-0" : "";

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // handle file upload
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const res = await signup(formDataToSend);
  
      
      if (res.data.statusCode === 200) {
        navigate("/login");
      } else {
        setErrorMsg(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMsg("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div
        className={`signup-card p-4 rounded shadow ${bgClass}`}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Sign up to NotesHub</h3>

        {errorMsg && (
          <div className="alert alert-danger text-center py-2 mt-2" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleOnSubmit} encType="multipart/form-data">
          
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${inputBg}`}
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              required
            />
          </div>

      
          <div className="mb-3">
            <label className="form-label">Username</label>
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
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${inputBg}`}
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              required
            />
          </div>

          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${inputBg}`}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              required
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label">BIO</label>
            <textarea
              className={`form-control ${inputBg}`}
              name="bio"
              rows="2"
              value={formData.bio}
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <input
              type="file"
              className={`form-control ${inputBg}`}
              name="avatar"
              accept="image/*"
              onChange={handleOnChange}
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className={`btn btn-primary ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-underline text-info">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
