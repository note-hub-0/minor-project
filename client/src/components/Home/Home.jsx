import React from 'react';
import {Link, useNavigate} from "react-router"
import heroSection from "../../assets/heroImg-removebg-preview (2) - Copy.png";
import { useTheme } from '../../Hooks/CustomeHooks/useTheme';

export default function Home() {
  const { theme } = useTheme();
  const navigate= useNavigate()


  const bg = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const text = theme === 'dark' ? 'text-light' : 'text-dark';
  const cardBg = theme === 'dark' ? 'bg-secondary' : 'bg-white';

    const goToNotes = () => {
    navigate("/notes");
  };
  const goToUpload = () => {
    navigate("/uploadNotes")
  }

  return (
    <>
      <section className={`py-5 ${bg} ${text}`}>
        <div className="container">
          <div className="row align-items-center text-center text-lg-start">
            <div className="col-lg-6">
              <h1 className="mb-3 fw-bold">Share. Learn. Grow. with <span className="text-primary">NoteHub!</span></h1>
              <p className="mb-4 fs-5">Upload your class notes and earn credits. Download what you need — simple & fast.</p>
              <div>
                <button className="btn btn-primary btn-lg me-3 shadow-sm" onClick={goToUpload}>Upload Notes</button>
                <button className="btn btn-outline-primary btn-lg" onClick={goToNotes}>Browse Notes</button>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <img src={heroSection} alt="NoteHub Hero" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      <section className={`py-5 ${bg} ${text} text-center`}>
        <div className="container">
          <h2 className="section-title mb-4">How It Works</h2>
          <div className="row g-4 justify-content-center">
            {[
              { icon: "fas fa-user-plus", text: "Sign Up" },
              { icon: "fas fa-upload", text: "Upload Notes" },
              { icon: "fas fa-coins", text: "Earn Credits" },
              { icon: "fas fa-download", text: "Download Notes" },
            ].map((item, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className={`card shadow-sm py-4 ${cardBg} ${text}`}>
                  <i className={`${item.icon} fa-2x mb-3 text-primary`}></i>
                  <p className="fw-semibold">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className={`py-5 ${bg} ${text}`}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Trending Notes</h2>
            <Link to="/notes" className="btn btn-outline-secondary btn-sm">See All</Link>
          </div>
          <div className="row g-4">
            {[
              { title: "Linear Algebra Notes", desc: "Basic - Wicn", semester: "Linear" },
              { title: "Algebra Notes", desc: "Semester: Unknown", semester: "Fall: 80%" },
              { title: "Algebra Lorsby Notes", desc: "Semester 2", semester: "Linen" },
            ].map((note, i) => (
              <div key={i} className="col-sm-6 col-md-4">
                <div className={`card p-3 h-100 shadow-sm border-0 ${cardBg} ${text}`}>
                  <h5>{note.title}</h5>
                  <p>{note.desc}</p>
                  <p><strong>Semester:</strong> {note.semester}</p>
                  <button className="btn btn-primary btn-sm mt-2">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      <section className={`py-5 ${bg} ${text}`}>
        <div className="container text-center">
          <h2 className="section-title">Why NoteHub?</h2>
          <div className="row g-4 mt-4">
            {[
              { icon: "fas fa-book", text: "Syllabus-wise notes" },
              { icon: "fas fa-coins", text: "Earn credits" },
              { icon: "fas fa-users", text: "Student community" },
              { icon: "fas fa-lock", text: "Secure sharing" },
            ].map((item, i) => (
              <div key={i} className="col-md-3 col-6">
                <div className={`card shadow-sm py-4 px-2 ${cardBg} ${text}`}>
                  <i className={`${item.icon} fa-2x mb-3 text-primary`}></i>
                  <p className="fw-semibold">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
