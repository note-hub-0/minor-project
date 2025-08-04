import React, { useState } from "react";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";

export default function FilterNotes({
  classes,
  subjects,
  sortBy,
  selectedClass,
  selectedSubject,
  setSelectedClass,
  setSelectedSubject,
  setSortBy
}) {
  // const [selectedClass, setSelectedClass] = useState("");
  // const [selectedSubject, setSelectedSubject] = useState("");
  // const [sortBy, setSortBy] = useState("");

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const selectClass = isDark
    ? "form-select bg-dark text-light border-secondary"
    : "form-select";

  // console.log(selectedClass);

  return (
    <div className="container mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-md-4">
          <select
            className={selectClass}
            value={selectedClass}
            name="Class"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">📘 Select Semester</option>
            {classes.map((Class) => {
              return (
                <option value={Class} key={Class}>
                  {Class}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className={selectClass}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">📚 Select Subject</option>
            {subjects.map((subject) => (
              <option value={subject} key={subject}>
                {subject}
              </option>
            ))}
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
