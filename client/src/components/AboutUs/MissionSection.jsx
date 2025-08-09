import React from "react";
import { Row, Col } from "react-bootstrap";

export default function MissionSection({ isDark }) {
  return (
    <Row className="align-items-center mb-5 animate__animated animate__fadeInLeft">
      <Col md={6}>
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
          alt="Our Mission"
          className="img-fluid rounded shadow"
        />
      </Col>
      <Col md={6}>
        <h2>Our Mission</h2>
        <p>
          At NotesHub, we aim to simplify the way you capture, organize, and share your thoughts. 
          Our mission is to empower individuals and teams with tools that make note-taking faster, smarter, and more collaborative.
        </p>
      </Col>
    </Row>
  );
}
