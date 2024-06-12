import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../action/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getMyOrders } from "../action/orderAction";
import { Link } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { error, loading, user } = useSelector((state) => state.userProfile);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const {myOrders, loading: myOrdersLoading, error: myOrdersError} = useSelector((state) => state.myOrders);

  const [message, setMessage] = useState(null);
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
      setMessage("Password must be the same as Confirm Password");
    } else {
      dispatch(
        updateUserProfile({
          username: formdata.username,
          password: formdata.password,
          email: formdata.email,
        })
      );
    }
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || success || userInfo._id !== user._id) {
        dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        dispatch(getUserProfile('profile'));
        dispatch(getMyOrders());
      } else {
        setFormdata({
          email: user.email,
          username: user.username,
          password: "",
          confirmPassword: "",
        });
      }
    }
  }, [dispatch, userInfo, user, navigate, success]);
  return (
    <Container>
      <Row>
        <Col md={4}>
          <h1>Profile</h1>
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={formdata.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h1>My Orders</h1>
          <Table bordered striped size='sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>

            <tbody>
              {myOrdersLoading && <Loader/>}
              {myOrdersError && <Message type='danger' message={error}/>}
              {myOrders?.map((order)=>(<tr>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid? (<FcCheckmark/>):(<FaXmark style={{color: "red"}}/>)}</td>
                <td>{order.isDeliverd? (<FcCheckmark/>):(<FaXmark style={{color: "red"}}/>)}</td>
                <td><Link to={`/order/${order._id}`}><Button>Detail</Button></Link></td>
              </tr>))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
