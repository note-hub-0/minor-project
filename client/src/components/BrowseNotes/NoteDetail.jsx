import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PdfViewer from "./PdfViewer";
import Spinner from "../Loader/Spinner";
import { getNoteById } from "../../api/notesApi";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await getNoteById(id);
        console.log(res.data.data.file);
        
        setNote(res.data.data);
      } catch (err) {
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  if (loading) return <Spinner />;
  if (!note) return <p>Note not found.</p>;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PdfViewer pdfUrl={note.file} />
    </div>
  );
}
