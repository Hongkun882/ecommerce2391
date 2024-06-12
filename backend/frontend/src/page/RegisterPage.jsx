import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../action/userAction";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formdata, setFormdata] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
      setMessage("Password must be the same as Confirm Password");
    } else {
      dispatch(register(formdata.username, formdata.email, formdata.password));
    }
  };
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <FormContainer>
      <h1>Register</h1>
      {error && <Message type={"danger"} message={error} />}
      {message && <Message type={"danger"} message={message} />}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={formdata.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={formdata.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formdata.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={formdata.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already had an account? <Link to={"/login"}>Log in</Link>
        </Col>
      </Row>

    </FormContainer>
  );
}

export default RegisterPage;
