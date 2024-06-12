import React, { useEffect } from "react";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { getOrderList } from "../action/orderAction";
import { FaXmark } from "react-icons/fa6";

function OrderListPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { orderList, loading, error } = useSelector((state) => state.orderList);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getOrderList());
    }
  }, [dispatch, navigate, userInfo]);

  const handleClick = (_id) => {
    navigate(`/order/${_id}`);
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message type={"danger"} message={error} />;
  }
  if (userInfo && !userInfo.isAdmin) {
    return (
      <Message
        type={"danger"}
        message={"You do not have permission to perform action"}
      />
    );
  }
  return (
    <Container>
      
      <Row className="align-items-center">
        <Col>
          <h1>ORDERS</h1>
        </Col>
      </Row>
      <Row>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NUMBER OF ITEMS</th>
              <th>TOTAL PRICE</th>
              <th>DATE</th>
              <th>USER</th>
              <th>IS PAID</th>
              <th>IS DELIEVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orderList?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.orderItems.reduce((acc, item) => acc + item.qty, 0)}
                </td>
                <td>${order.totalPrice}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.user.username}</td>
                <td>
                  {order.isPaid ? (
                    <span>Paid at {order.paidAt.substring(0, 10)}</span>
                  ) : (
                    <FaXmark />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span>
                      Delivered at {order.deliveredAt.substring(0, 10)}
                    </span>
                  ) : (
                    <FaXmark />
                  )}
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      handleClick(order._id);
                    }}
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default OrderListPage;
