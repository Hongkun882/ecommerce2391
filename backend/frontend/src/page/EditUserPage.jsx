import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUser } from "../action/userAction";

function EditUserPage() {
  const [formdata, setFormdata] = useState({
    email: "",
    username: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user, loading, error } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = useSelector((state) => state.userUpdate);
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (successUpdate) {
      dispatch({ type: "USER_UPDATE_RESET" });
      dispatch({type:"USER_PROFILE_RESET"})
      navigate("/admin/users");
    } else {
      if (!user || Number(userId) !== user._id) {
        dispatch(getUserProfile(userId));
      } else {
        setFormdata({ email: user.email, username: user.username });
        setIsAdmin(user.isAdmin);
      }
    }
  }, [userId, dispatch, user, userInfo, navigate, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(updateUser(userId, {...formdata, isAdmin}));

  };


  if (error) {
    return <Message type={"danger"} message={error} />;
  }
  return (
    <Container>
      <Row>
        <Link to="/admin/users" className="mb-2">
          Go Back
        </Link>
      </Row>
      <Row>
        <FormContainer>
          <h1>Edit User</h1>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type={"danger"} message={errorUpdate} />}
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

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={formdata.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Check
              label="isAdmin"
              checked={isAdmin}
              onChange={(e) => {
                setIsAdmin(e.target.checked);
              }}
            ></Form.Check>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </FormContainer>
      </Row>
    </Container>
  );
}

export default EditUserPage;
