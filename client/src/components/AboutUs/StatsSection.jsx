import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function StatsSection({ isDark }) {
  const stats = [
    { number: "15K+", label: "Active Students" },
    { number: "250K+", label: "Notes Shared" },
    { number: "50+", label: "Colleges Participating" },
    { number: "10+", label: "Subjects Covered" },
  ];

  const cardBgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";
  const cardShadowClass = isDark ? "shadow-lg" : "shadow";

  return (
    <Row className="text-center my-5 animate__animated animate__fadeInRight">
      {stats.map((stat, idx) => (
        <Col key={idx} xs={6} md={3} className="mb-4">
          <Card
            className={`${cardBgClass} ${cardShadowClass} rounded-4 p-4 border-0`}
            style={{
              minHeight: "160px",
              transition: "transform 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2 className="display-4 fw-bold mb-2">{stat.number}</h2>
            <p className="lead mb-0">{stat.label}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
