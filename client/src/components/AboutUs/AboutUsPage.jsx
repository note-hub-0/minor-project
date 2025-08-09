import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";
import MissionSection from "./MissionSection";
import StatsSection from "./StatsSection";
import TeamMemberCard from "./TeamMemberCard";
import "animate.css";
import TeamSection from "./TeamSection ";
import TeamIntro from "./TeamInto";

export default function AboutUsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";



  return (
    <main className={`py-5 ${bgClass}`}>
      <Container>
        <Row className="text-center mb-5 animate__animated animate__fadeInDown">
          <Col>
            <h1>About Us</h1>
            <p className="lead">
              We build innovative tools to make your notes smarter and more accessible.
            </p>
          </Col>
        </Row>

  
        <MissionSection isDark={isDark} />

  
        <StatsSection isDark={isDark} /> 

    <TeamIntro isDark={isDark}/>
    <TeamSection isDark={isDark}/>
      </Container>
    </main>
  );
}
