import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme"
import Spinner from "../Loader/Spinner";

export default function PointHistory() {
  const { theme } = useTheme(); // get current theme from context
  const isDark = theme === "dark"; // derived boolean for class use

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("No user found in localStorage.");

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      setTimeout(() => {
        setTransaction(parsedUser.transaction || []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }, []);

   const handleLogout = async () => {
      try {
        await logout();
        localStorage.removeItem("user");
        navigate("/");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };

  return (
    <div className={`container my-5 ${isDark ? "text-light" : ""}`}>
      <div className="text-center mb-4">
        <h2 className="fw-bold">📄 Point History</h2>
      </div>

 
      {loading && (
        <div className="text-center my-5">
         <Spinner/>
          <p className="mt-2">Loading...</p>
        </div>
      )}


      {!loading && errorMessage && (
        <div
          className={`alert text-center ${
            isDark ? "alert-danger bg-transparent border border-danger" : "alert-danger"
          }`}
        >
          {errorMessage}
        </div>
      )}


      {!loading && !errorMessage && (
        <>
          <UserProfile
            user={user}
            cardClass={isDark ? "bg-secondary text-light" : "bg-light"}
            subTitle={isDark ? "text-light" : "text-muted"}
            isDark={isDark}
            handleLogout={handleLogout}
          />

          <div className={`card shadow-sm mt-4 ${isDark ? "bg-secondary text-light" : ""}`}>
            <div className={`card-header fw-semibold ${isDark ? "bg-dark text-light" : "bg-primary text-white"}`}>
              Point History Table
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className={`table table-hover mb-0 text-center ${isDark ? "table-dark table-bordered" : "table-striped"}`}>
                  <thead className={isDark ? "" : "table-dark"}>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Reason</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.length > 0 ? (
                      transaction.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.date || "N/A"}</td>
                          <td>{entry.type}</td>
                          <td>{entry.reason}</td>
                          <td className={`fw-bold ${entry.type === "earn" ? "text-success" : "text-danger"}`}>
                            {entry.type === "earn" ? "+" : "-"}
                            {entry.value}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-muted">
                          No point history available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
