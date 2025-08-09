import { useEffect, useState } from "react";
import { getPurchasedNotes, getUserNotes } from "../../api/notesApi";
import Spinner from "../Loader/Spinner";
import MyNoteCard from "./MyNoteCard";

export default function SeeAllMyNotes() {
  const [myNotes, setMyNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyNotes() {
      try {
        const res = await getUserNotes();

        setMyNotes(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchMyNotes();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Thank you for your Uploads! 🎉</h1>
      <p>Your notes:</p>
      <div className="row">
        {myNotes.map((note) => (
          <div key={note._id} className="col-md-4 mb-3">
            <MyNoteCard note={note} />
          </div>
        ))}
      </div>
    </div>
  );
}
