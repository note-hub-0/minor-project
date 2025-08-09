import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import NoteCard from "../BrowseNotes/NoteCard";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import { getCurrectUser, logout } from "../../api/authApi";
import { deleteNoteById } from "../../api/notesApi";
import Spinner from "../Loader/Spinner";
import UserProfile from "./UserProfile";
import MyNoteCard from "./MyNoteCard";

const UserDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [purchasedNotes, setPurchasedNotes] = useState([]);
  const [myNotes, setMyNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";
  const cardClass = isDark
    ? "bg-dark border-secondary text-light"
    : "bg-white border-light text-dark";
  const sectionTitle = isDark ? "text-info" : "text-primary";
  const subTitle = isDark ? "text-light opacity-75" : "text-muted";

  const getUser = async () => {
    try {
      const res = await getCurrectUser();
      const userData = res.data.data;
      setUser(userData);
      setMyNotes(userData.notes || []);
      setPurchasedNotes(userData.purchasedNotes || []);
    } catch (error) {
      console.log("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await deleteNoteById(noteId);
      setMyNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  const handleSeeAllPurchasedNotes = () => {
    navigate("/purchased-notes")
  }
  const handleSeeAllMyNotes = () => {
    navigate('/user-notes')
  }
  return (
    <div className={`min-vh-100 py-5 px-3 ${bgClass}`}>

      <UserProfile handleLogout={handleLogout} user={user} cardClass={cardClass} subTitle = {subTitle} isDark={isDark}/>

 
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${sectionTitle}`}>📘 Purchased Notes</h5>
          <button className="btn btn-link btn-sm" onClick={handleSeeAllPurchasedNotes}>Show All</button>
        </div>
        {loading ? (
          <Spinner/>
        ) : purchasedNotes.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {purchasedNotes.slice(0, 4).map((note) => (
              <div className="col" key={note._id}>
                <NoteCard note={note} isPurchased={true} />
              </div>
            ))}
          </div>
        ) : (
          <p className={subTitle}>No purchased notes yet.</p>
        )}
      </div>

 
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5
            className={`fw-semibold ${isDark ? "text-warning" : "text-dark"}`}
          >
            📝 My Notes
          </h5>
          <button className="btn btn-link btn-sm" onClick={handleSeeAllMyNotes}>Show All</button>
        </div>
        {loading ? (
          <Spinner/>
        ) : myNotes.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {myNotes.slice(0, 4).map((note) => (
              <div className="col" key={note._id}>
                <MyNoteCard note={note} onDelete={handleDeleteNote}/>
              </div>
            ))}
          </div>
        ) : (
          <p className={subTitle}>No notes uploaded by you yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
