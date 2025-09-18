import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import TufailImg from "../../assets/Tufail.jpg"
import AmitImg from "../../assets/Amit.jpg"
import PriyaImg from "../../assets/Priya.jpg"
import SupriyaImg from "../../assets/Supriya.jpg"
import SartajImg from "../../assets/Sartaj.jpg"
import DeepuImg from "../../assets/Deepu.jpg"

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
      img: SupriyaImg,
      linkedin: "https://linkedin.com/in/supriya-panday",
    },
    {
      name: "Deepu Mehra",
      role: "Frontend Developer",
      responsibilities:
        "Developing static pages using HTML/CSS/JS, supporting UI components",
      img: DeepuImg,
      github: "https://github.com/deepum",
    },
    {
      name: "Priya Kumari",
      role: "QA & Testing Analyst",
      responsibilities:
        "Testing app functionalities, checking flow usability, preparing bug reports",
      img: PriyaImg,
    },
    {
      name: "Sartaj Ali",
      role: "Database & Backend Integration Assistant",
      responsibilities:
        "Setting up database (Firebase/MySQL), testing APIs/data flow, basic backend support",
      img: SartajImg,
      linkedin: "https://linkedin.com/in/sartajali",
    },
    {
      name: "Amit Yadav",
      role: "UI/UX Designer",
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
