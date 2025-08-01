import React, { useState } from "react";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";

export default function FilterNotes() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const selectClass = isDark
    ? "form-select bg-dark text-light border-secondary"
    : "form-select";

  return (
    <div className="container mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-md-4">
          <select
            className={selectClass}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">📘 Select Semester</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
            <option value="3rd">3rd Semester</option>
            <option value="4th">4th Semester</option>
            <option value="5th">5th Semester</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className={selectClass}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">📚 Select Subject</option>
            <option value="DSA">DSA</option>
            <option value="OS">Operating System</option>
            <option value="DBMS">DBMS</option>
            <option value="Python">Python</option>
            <option value="WebTech">Web Technology</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className={selectClass}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">🔍 Sort By</option>
            <option value="recent">Most Recent</option>
            <option value="views">Most Viewed</option>
            <option value="popular">Most Downloaded</option>
          </select>
        </div>
      </div>
    </div>
  );
}
