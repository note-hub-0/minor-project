import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import NoteCard from "../BrowseNotes/NoteCard";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import { getCurrectUser, logout } from "../../api/authApi";
// import { deleteNoteById } from "../../api/noteApi";

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
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    // if (!confirmDelete) return;

    // try {
    //   await deleteNoteById(noteId);
    //   setMyNotes((prev) => prev.filter((note) => note._id !== noteId));
    // } catch (err) {
    //   console.error("Failed to delete note:", err);
    // }
  };

  return (
    <div className={`min-vh-100 py-5 px-3 ${bgClass}`}>
      {/* Profile Section */}
      <div className={`container mb-5 p-4 rounded shadow ${cardClass}`}>
        <div className="row align-items-center">
          <div className="col-md-8 d-flex align-items-center gap-3">
            <img
              src={user?.avatar || "https://via.placeholder.com/70"}
              alt="avatar"
              className="rounded-circle object-fit-cover"
              style={{ width: 70, height: 70 }}
            />
            <div>
              <h4 className="fw-bold mb-1">{user?.username || "Username"}</h4>
              <p className={`mb-0 ${subTitle}`}>Name: {user?.name || "N/A"}</p>
              <p className={`mb-0 ${subTitle}`}>
                Total Points:{" "}
                <span className="fw-semibold text-success">
                  {user?.points || 0}
                </span>
              </p>
            </div>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0 d-flex flex-column gap-2 align-items-end">
            <Link
              to="/point-history"
              className={`btn btn-sm ${
                isDark ? "btn-outline-light" : "btn-outline-primary"
              }`}
            >
              Point History
            </Link>
            <button
              onClick={handleLogout}
              className={`btn btn-sm ${
                isDark ? "btn-outline-danger" : "btn-outline-danger"
              }`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Purchased Notes Section */}
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`fw-semibold ${sectionTitle}`}>📘 Purchased Notes</h5>
          <button className="btn btn-link btn-sm">Show All</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : purchasedNotes.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {purchasedNotes.slice(0, 4).map((note) => (
              <div className="col" key={note._id}>
                <NoteCard note={note} />
              </div>
            ))}
          </div>
        ) : (
          <p className={subTitle}>No purchased notes yet.</p>
        )}
      </div>

      {/* My Notes Section */}
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5
            className={`fw-semibold ${isDark ? "text-warning" : "text-dark"}`}
          >
            📝 My Notes
          </h5>
          <button className="btn btn-link btn-sm">Show All</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : myNotes.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {myNotes.slice(0, 4).map((note) => (
              <div className="col" key={note._id}>
                <NoteCard note={note} onDelete={handleDeleteNote} />
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
