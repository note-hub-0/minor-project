import React, { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function TeamMemberCard({ member, isDark }) {
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(600px)" });

  const cardBg = isDark
    ? "rgba(30,30,30,0.65)"
    : "rgba(255,255,255,0.65)";
  const borderColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.1)";
  const textColor = isDark ? "#f0f0f0" : "#222";
  const shadowColor = isDark
    ? "0 15px 30px rgba(255,255,255,0.15)"
    : "0 15px 30px rgba(0,0,0,0.15)";

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const maxTilt = 10;

    setTiltStyle({
      transform: `perspective(600px) rotateX(${-deltaY * maxTilt}deg) rotateY(${deltaX * maxTilt}deg) scale(1.05)`,
      transition: "transform 0.1s ease",
    });
  }

  function handleMouseLeave() {
    setTiltStyle({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)" });
  }

  return (
    <div
      className="team-card"
      style={{
        background: cardBg,
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        border: `1px solid ${borderColor}`,
        boxShadow: shadowColor,
        width: "320px",
        padding: "30px 25px 40px",
        margin: "15px",
        color: textColor,
        cursor: "pointer",
        ...tiltStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          width: "140px",
          height: "140px",
          margin: "0 auto 25px",
          borderRadius: "50%",
          overflow: "hidden",
          border: `4px solid ${borderColor}`,
          boxShadow: isDark
            ? "0 0 20px rgba(255,255,255,0.4)"
            : "0 0 20px rgba(0,0,0,0.15)",
        }}
      >
        <img
          src={member.img}
          alt={member.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      </div>

      <h3
        style={{
          fontWeight: "800",
          fontSize: "1.5rem",
          marginBottom: "5px",
          letterSpacing: "0.07em",
          textAlign: "center",
        }}
      >
        {member.name}
      </h3>

      <h5
        style={{
          fontWeight: "600",
          fontSize: "1.1rem",
          marginBottom: "18px",
          color: isDark ? "#a3aab9" : "#666",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        {member.role}
      </h5>

      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.5,
          fontWeight: "500",
          whiteSpace: "pre-line",
          minHeight: "85px",
          marginBottom: "22px",
          textAlign: "center",
        }}
      >
        {member.responsibilities}
      </p>

      {/* Social Icons */}
      <div className="social-links" style={{ textAlign: "center", gap: "18px", display: "flex", justifyContent: "center" }}>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            style={{ color: isDark ? "#0e76a8" : "#0077b5", fontSize: "1.6rem", transition: "color 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#0b5c86"}
            onMouseLeave={e => e.currentTarget.style.color = isDark ? "#0e76a8" : "#0077b5"}
          >
            <FaLinkedin />
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} GitHub`}
            style={{ color: isDark ? "#fff" : "#333", fontSize: "1.6rem", transition: "color 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#6e5494"}
            onMouseLeave={e => e.currentTarget.style.color = isDark ? "#fff" : "#333"}
          >
            <FaGithub />
          </a>
        )}
      </div>
    </div>
  );
}
