import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../action/userAction";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

function LoginPage() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formdata.username, formdata.password));
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
      <h1>Sign In</h1>
      {error && <Message type={"danger"} message={error} />}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={formdata.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formdata.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
