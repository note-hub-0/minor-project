import React from "react";

export default function TeamIntro({ isDark }) {
  return (
    <section className={`text-center my-5 px-3`}>
      <h2 className={`mb-3 ${isDark ? "text-light" : "text-dark"}`}>
        Meet the Minds Behind NotesHub
      </h2>
      <p
        className={`lead mx-auto`}
        style={{ maxWidth: "700px", color: isDark ? "#ced4da" : "#495057" }}
      >
        Our dedicated team of skilled professionals combines expertise in
        development, design, and content creation to build a seamless,
        user-friendly platform. Together, we strive to empower students and
        learners worldwide by making note-taking smarter, efficient, and
        accessible for all.
      </p>
    </section>
  );
}
