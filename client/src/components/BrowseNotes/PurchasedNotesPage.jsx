import { useEffect, useState } from "react";
import { getPurchasedNotes } from "../../api/notesApi";
import Spinner from "../Loader/Spinner";
import NoteCard from "./NoteCard";

export default function PurchasedNotesPage() {
  const [purchasedNotes, setPurchasedNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchased() {
      try {
        const res = await getPurchasedNotes();
        console.log(res.data.data);
        
        setPurchasedNotes(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPurchased();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Thank you for your purchase! 🎉</h1>
      <p>Your purchased notes:</p>
      <div className="row">
        {purchasedNotes.map(note => (
          <div key={note.note._id} className="col-md-4 mb-3">
            <NoteCard note={note.note} isPurchased={true}/>
            </div>
        ))}
      </div>
    </div>
  );
}
