import React, { useEffect, useState } from "react";
import FilterNotes from "./FilterNotes";
import NoteCard from "./NoteCard";
import { buyNotes, getAllNotes } from "../../api/notesApi";
import Pagination from "./Pagination";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import { getClasses, getSubjectByClass } from "../../api/fillterApi";
import Spinner from "../Loader/Spinner";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BrowseNotes() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const getClass = async () => {
    try {
      const res = await getClasses();
      setClasses(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load classes.");
    }
  };

  useEffect(() => {
    getClass();
  }, []);

  const getSubject = async () => {
    try {
      const res = await getSubjectByClass(selectedClass);
      setSubjects(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load subjects.");
    }
  };

  useEffect(() => {
    if (selectedClass) getSubject();
    else setSubjects([]);
  }, [selectedClass]);

  const fetchNotes = async () => {
    const limit = 10;
    setLoading(true);
    try {
      const res = await getAllNotes({
        page,
        limit,
        Class: selectedClass,
        subject: selectedSubject,
        sortBy,
      });
      setNotes(res.data.data.notes);
      setTotalPages(res.data.data.numberOfPage);
    } catch (error) {
      console.error("Error fetching notes", error);
      toast.error("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page, selectedClass, selectedSubject, sortBy]);

  const hasPurchased = (noteId) => {
    if (!user?.purchasedNotes || !Array.isArray(user.purchasedNotes))
      return false;
    return user.purchasedNotes.some((purchasedNote) => {
      if (!purchasedNote) return false;
      return String(purchasedNote._id) === String(noteId);
    });
  };

  const buyNote = async (note) => {
    if (!user) {
      toast.info("Please login to purchase notes.");
      navigate("/login");
      return;
    }
      if (!user.points || user.points < (note.price || 0)) {
    toast.warning("You don’t have enough points. Redirecting to buy points page...");
    setTimeout(() => {
      navigate("/buy-points");
    }, 1000);
    return;
  }

    try {
      setLoading(true);
      await buyNotes(note._id);

      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          purchasedNotes: [...(prevUser.purchasedNotes || []), note],
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });

      toast.success("Purchase successful! Redirecting to your note...");
      navigate(`/notes/view/${note._id}`);
    } catch (error) {
      console.error("Purchase failed", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to purchase note";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-primary text-white py-4 mb-4 shadow-sm">
        <div className="container text-center">
          <h2 className="fw-bold mb-1">Browse Notes</h2>
          <p className="mb-0">
            Explore notes uploaded by students from different semesters and
            subjects.
          </p>
        </div>
      </div>

      <div className="container mb-4">
        <FilterNotes
          classes={classes}
          subjects={subjects}
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
          setSelectedClass={setSelectedClass}
          setSelectedSubject={setSelectedSubject}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      <div className="container py-4">
        {loading ? (
          <Spinner />
        ) : notes.length > 0 ? (
          <div className="row g-4">
            {notes.map((note) => (
              <div className="col-md-4" key={note._id}>
                <NoteCard
                  note={note}
                  isPurchased={hasPurchased(note._id)}
                  onBuyClick={buyNote}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 text-muted fs-5">
            No notes found for selected filters.
          </div>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
