import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="text-center">
      <Container>
        <Row>
          <Col>
            Copyright &copy; shopping
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
