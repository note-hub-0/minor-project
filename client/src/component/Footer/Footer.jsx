import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";

export default function Footer() {
  const {theme ,toggleTheme} = useTheme()
  return (
    <footer className={`footer bg-${theme === "dark" ? "light" : "dark"} text-${theme === "dark" ? "dark" : "light"} pt-5 pb-3 mt-5`}>
      <div className="container">
        <div className="row gy-4">
          {/* Logo & Description */}
          <div className="col-12 col-md-3">
            <h3 className="text-warning">NotesHub</h3>
            <p className="small">
              Learn, Share & Earn through quality notes. A platform for students by students.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/notes" className="footer-link">Browse Notes</Link></li>
              <li><Link to="/upload" className="footer-link">Upload Note</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

      
          <div className="col-6 col-md-3">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><Link to="/faq" className="footer-link">FAQs</Link></li>
              <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/support" className="footer-link">Help Center</Link></li>
            </ul>
          </div>

    
          <div className="col-12 col-md-3">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 mt-2">
              <a href="#" aria-label="Facebook" className={`text-${theme === "dark" ? "dark" : "light"} fs-5`}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Twitter" className={`text-${theme === "dark" ? "dark" : "light"} fs-5`}>
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram" className={`text-${theme === "dark" ? "dark" : "light"} fs-5`}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 border-top pt-3">
          <p className="mb-0 small">&copy; {new Date().getFullYear()} NotesHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
