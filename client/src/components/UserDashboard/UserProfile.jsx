import React from 'react';
import { Link } from 'react-router';

export default function UserProfile({ user, cardClass, handleLogout, subTitle, isDark }) {
  return (
    <div className={`container mb-5 p-4 rounded shadow ${cardClass}`}>
      <div className="row align-items-center text-center text-md-start">

        <div className="col-12 col-md-8 d-flex flex-column flex-md-row align-items-center gap-3 mb-3 mb-md-0">
          <img
            src={user?.avatar || "https://via.placeholder.com/70"}
            alt="avatar"
            className="rounded-circle object-fit-cover"
            style={{ width: 70, height: 70 }}
          />
          <div>
            <h4 className="fw-bold mb-1">{user?.username || "Username"}</h4>
            <p className={`mb-1 ${subTitle}`}>Name: {user?.name || "N/A"}</p>
            <p className={`mb-0 ${subTitle}`}>
              Total Points:{" "}
              <span className="fw-semibold text-success">
                {user?.points || 0}
              </span>
            </p>
          </div>
        </div>


        <div className="col-12 col-md-4 d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-2">
          <Link
            to="/point-history"
            className={`btn btn-sm ${
              isDark ? "btn-outline-light" : "btn-outline-primary"
            }`}
          >
            Point History
          </Link>
          <button
            onClick={handleLogout}
            className={`btn btn-sm ${
              isDark ? "btn-outline-danger" : "btn-outline-danger"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
