import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import TufailImg from "../../assets/Tufail.jpg"
import AmitImg from "../../assets/Amit.jpg"

export default function TeamSection({ isDark }) {
  const team = [
    {
      name: "Tufail Ansari",
      role: "Project Lead & Full-Stack Developer",
      responsibilities:
        "Project planning, frontend & backend development, source control (Git), team coordination",
      img: TufailImg,
      linkedin: "https://linkedin.com/in/tufailansari",
      github: "https://github.com/tufail101",
    },
    {
      name: "Supriya Kumari Panday",
      role: "Technical Content Specialist",
      responsibilities:
        "Preparing project documentation (report + PPT), writing objective, features, conclusion etc.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      linkedin: "https://linkedin.com/in/supriya-panday",
    },
    {
      name: "Deepu Mehra",
      role: "Frontend Development Associate",
      responsibilities:
        "Developing static pages using HTML/CSS/JS, supporting UI components",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      github: "https://github.com/deepum",
    },
    {
      name: "Priya Kumari",
      role: "QA & Testing Analyst",
      responsibilities:
        "Testing app functionalities, checking flow usability, preparing bug reports",
      img: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      name: "Sartaj Ali",
      role: "Database & Backend Integration Assistant",
      responsibilities:
        "Setting up database (Firebase/MySQL), testing APIs/data flow, basic backend support",
      img: "https://randomuser.me/api/portraits/men/10.jpg",
      linkedin: "https://linkedin.com/in/sartajali",
    },
    {
      name: "Amit Yadav",
      role: "UI/UX Design Assistant",
      responsibilities:
        "Creating mockups using Canva/Figma, deciding color palettes, layout ideas",
      img: AmitImg,
    },
  ];

  return (
    <section
      style={{
        padding: "50px 0",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      {team.map((member, idx) => (
        <TeamMemberCard key={idx} member={member} isDark={isDark} />
      ))}
    </section>
  );
}
