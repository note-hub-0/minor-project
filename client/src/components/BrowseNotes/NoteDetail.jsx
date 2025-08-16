import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../Loader/Spinner";
import { getNoteById } from "../../api/notesApi";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getNoteById(id);
        setNote(res.data?.data);
      } catch (err) {
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Spinner />;
  if (!note) return <p>Note not found.</p>;

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>


    
      <div style={{ flex: 1, borderTop: "1px solid #e5e5e5" }}>
        <iframe
          src={note.file}
          style={{ width: "100%", height: "100%" }}
          frameBorder="0"
          title="Note PDF"
        />
      </div>
    </div>
  );
}
