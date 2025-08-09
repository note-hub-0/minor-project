import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getNoteById, buyNotes } from "../../api/notesApi";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import Spinner from "../Loader/Spinner";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NotesDetails.css";

export default function NoteDetail() {
  const { id } = useParams();
  const { theme } = useTheme();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buying, setBuying] = useState(false);

  const isDark = theme === "dark";

  const fetchNote = async () => {
    setLoading(true);
    setError(null);
    setNote(null);

    try {
      const res = await getNoteById(id);
      setNote(res.data.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setError("This is a premium note. Please purchase it to get access.");
      } else if (err.response?.status === 404) {
        setError("Note not found.");
      } else {
        setError("Failed to load note details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleBuyNote = async () => {
    setBuying(true);
    setError(null);
    try {
      await buyNotes(id);
      toast.success("Note purchased successfully!");
      await fetchNote();
    } catch (err) {
      const msg = err.response?.data?.message || "Purchase failed.";
      toast.error(msg);
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`d-flex justify-content-center align-items-center vh-75 ${
          isDark ? "bg-dark" : "bg-light"
        }`}
      >
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`container py-5 text-center ${
          isDark ? "text-light bg-dark" : "text-dark bg-light"
        } rounded shadow-sm`}
        style={{ maxWidth: "600px" }}
      >
        <p className="mb-4 fs-5">{error}</p>
        {error.toLowerCase().includes("purchase") ? (
          <button
            className={`btn ${isDark ? "btn-outline-light" : "btn-primary"}`}
            onClick={handleBuyNote}
            disabled={buying}
          >
            {buying ? "Processing..." : "Buy Now"}
          </button>
        ) : (
          <button
            className={`btn mt-3 ${
              isDark ? "btn-outline-light" : "btn-secondary"
            }`}
            onClick={fetchNote}
            disabled={loading}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!note) {
    return (
      <div
        className={`container py-5 text-center ${
          isDark ? "text-light bg-dark" : "text-dark bg-light"
        } rounded shadow-sm`}
        style={{ maxWidth: "600px" }}
      >
        <p className="fs-5">Note data is not available.</p>
        <button
          className={`btn ${isDark ? "btn-outline-light" : "btn-primary"}`}
          onClick={fetchNote}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div
      className={`container py-4 ${
        isDark ? "text-light bg-dark" : "text-dark bg-white"
      } rounded shadow-sm`}
      style={{ maxWidth: "900px" }}
    >
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className={isDark ? "text-light" : "text-primary"}>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to="/notes"
              className={isDark ? "text-light" : "text-primary"}
            >
              Notes
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {note.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-5 mb-4 position-relative">
          {note.thumbnail ? (
            <img
              src={note.thumbnail}
              alt="Note Thumbnail"
              className="img-fluid rounded shadow note-thumbnail"
              style={{ height: "280px", objectFit: "cover", width: "100%" }}
            />
          ) : (
            <div
              className={`d-flex align-items-center justify-content-center rounded shadow bg-secondary ${
                isDark ? "bg-opacity-75" : "bg-opacity-25"
              }`}
              style={{ height: "280px", width: "100%" }}
            >
              <span>No Image Available</span>
            </div>
          )}
          {error && error.toLowerCase().includes("purchase") && (
            <span
              className="badge bg-warning text-dark position-absolute top-0 start-0 m-3 shadow"
              style={{ fontSize: "0.9rem" }}
              title="Premium Note"
            >
              Premium
            </span>
          )}
        </div>
        <div className="col-md-7 d-flex flex-column justify-content-between">
          <div>
            <h1 className="fw-bold">{note.title}</h1>
            <p className="text-muted fs-5">{note.description}</p>
            <p className="text-secondary">
              Uploaded by: <strong>{note.owner.name}</strong> (@
              {note.owner.username})
            </p>
          </div>

          <div className="d-flex gap-3 mt-4 flex-wrap">
            <a
              href={note.file}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-grow-1"
              aria-label="View or download note file"
            >
              View / Download
            </a>

            {error && error.toLowerCase().includes("purchase") && (
              <button
                className="btn btn-success flex-grow-1"
                onClick={handleBuyNote}
                disabled={buying}
                aria-label="Buy premium note"
              >
                {buying ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </>
                ) : (
                  "Buy Now"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
