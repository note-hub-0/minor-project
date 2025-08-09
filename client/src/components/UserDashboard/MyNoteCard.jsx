import React from "react";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";

export default function MyNoteCard({ note, onDelete, onView }) {
  const { theme } = useTheme();
  const { _id, title, description, thumbnail, isPremium, price } = note;

  const isDark = theme === "dark";
  const cardBg = isDark
    ? "bg-dark text-light border-secondary"
    : "bg-white text-dark border-light";

  const badgeClass = isPremium ? "bg-warning text-dark" : "bg-success text-light";

  return (
    <div className={`card shadow-sm h-100 border ${cardBg}`}>
      {thumbnail && (
        <img
          src={thumbnail}
          className="card-img-top"
          alt="Note Thumbnail"
          style={{
            height: "180px",
            objectFit: "cover",
            borderRadius: "0.375rem 0.375rem 0 0",
          }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold mb-2">{title}</h5>
        <p className="card-text small text-muted">{description}</p>

        <div className="mb-2">
          <span className={`badge ${badgeClass} me-2`}>
            {isPremium ? `Premium - ${price} Points` : "Free"}
          </span>
        </div>

        <div className="mt-auto d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onView && onView(_id)}
          >
          View
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete && onDelete(_id)}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
