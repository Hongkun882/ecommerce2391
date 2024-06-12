import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutStep({ step1, step2, step3 }) {
  return (
    <Nav className="justify-content-center mb-3">
      

      <Nav.Item>
        {step1 ? (
          <LinkContainer to={"/address"}>
            <Nav.Link> Shipping </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to={"/payment"}>
            <Nav.Link> Payment Method </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment Method</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to={"/place-order"}>
            <Nav.Link> Place Order </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>

    </Nav>
  );
}

export default CheckoutStep;
