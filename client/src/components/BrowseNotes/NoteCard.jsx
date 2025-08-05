import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";

export default function NoteCard({ note ,onDelete}) {
  const { theme } = useTheme();
  const { _id, title, description, thumbnail, owner } = note;

  const isDark = theme === "dark";
  const cardBg = isDark
    ? "bg-dark text-light border-secondary"
    : "bg-white text-dark border-light";
  const btnClass = isDark ? "btn-outline-light" : "btn-outline-primary";
  const mutedText = isDark ? "text-light opacity-75" : "text-muted";

  return (
    <div className={`card shadow-sm h-100 border ${cardBg}`}>
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

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold mb-2">{title}</h5>
        <p className={`card-text small ${mutedText}`}>{description}</p>

        <div className="d-flex align-items-center gap-2 mt-3 mb-3">
          <img
            src={owner?.avatar}
            alt={owner?.name}
            className="rounded-circle"
            style={{ width: "32px", height: "32px", objectFit: "cover" }}
          />
          <span className="fw-medium">{owner?.name}</span>
        </div>

        <div className="mt-auto text-end">
          <Link to={`/notes/${_id}`} className={`btn ${btnClass} btn-sm px-3`}>
            View Note
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(_id)}
              className="btn btn-sm btn-outline-danger m-3"
            >
              🗑 Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
