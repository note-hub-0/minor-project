import React, { useEffect, useState } from "react";
import FilterNotes from "./FilterNotes";
import NoteCard from "./NoteCard";
import { getAllNotes } from "../../api/notesApi";
import Pagination from "./Pagination";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";

export default function BrowseNotes() {
  const { theme } = useTheme();
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotes = async () => {
    const limit = 10;
    try {
      const res = await getAllNotes(page, limit);
      setNotes(res.data.data.notes);
      setTotalPages(res.data.data.numberOfPage);
    } catch (error) {
      console.error("Error fetching notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page]);

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
        <FilterNotes />
      </div>
      <div className="container py-4">
        <div className="row g-4">
          {notes.map((note) => (
            <div className="col-md-4" key={note._id}>
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
