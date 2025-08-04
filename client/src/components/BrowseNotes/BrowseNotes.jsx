import React, { useEffect, useState } from "react";
import FilterNotes from "./FilterNotes";
import NoteCard from "./NoteCard";
import { getAllNotes } from "../../api/notesApi";
import Pagination from "./Pagination";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import { getClasses, getSubjectByClass } from "../../api/fillterApi";
import Spinner from "../Loader/Spinner";

export default function BrowseNotes() {
  const { theme } = useTheme();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch class list
  const getClass = async () => {
    try {
      const res = await getClasses();
      setClasses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClass();
  }, []);

  // Fetch subject list when class changes
  const getSubject = async () => {
    try {
      const res = await getSubjectByClass(selectedClass);
      setSubjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubject();
  }, [selectedClass]);

  // Fetch notes
  const fetchNotes = async () => {
    const limit = 10;
    setLoading(true);
    try {
      const res = await getAllNotes({
        page,
        limit,
        Class: selectedClass,
        subject: selectedSubject,
        sortBy
      });
      setNotes(res.data.data.notes);
      setTotalPages(res.data.data.numberOfPage);
    } catch (error) {
      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    console.log(notes);
    
  }, [page, selectedClass, selectedSubject]);

  return (
    <>
      <div className="bg-primary text-white py-4 mb-4 shadow-sm">
        <div className="container text-center">
          <h2 className="fw-bold mb-1">Browse Notes</h2>
          <p className="mb-0">
            Explore notes uploaded by students from different semesters and subjects.
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
                <NoteCard note={note} />
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
