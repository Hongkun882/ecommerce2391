import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deliverOrder, getOrderDetail, payOrder } from "../action/orderAction";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
function OrderPage() {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, error, loading } = orderDetail;
  const { successPay, loadingPay } = useSelector((state) => state.orderPay);
  const { successDelivered } = useSelector((state) => state.orderDeliver);
  const { orderId } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  let itemPrice;
  if (order) {
    itemPrice = order.orderItems.reduce(
      (acc, item) => acc + item.qty * parseFloat(item.price),
      0
    );
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYJ5jr6ozFwfneMv6Bymj-NY_TmFx6UsGUsNtjcReJq0PnBcu5eleLuuTtvqwLUXtJImFziRPadOjpq4";
    script.type = "text/javascript";
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const handleDeliver = () => {
    console.log("meow")
    dispatch(deliverOrder(orderId));
  };
  useEffect(() => {
    if (
      !order ||
      order._id !== Number(orderId) ||
      successPay ||
      successDelivered
    ) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch({ type: "ORDER_DELIVER_RESET" });
      dispatch(getOrderDetail(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay,successDelivered]);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message type="danger" message={error} />;
  }
  if(!userInfo){
    navigate("/login")
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>Order ID: {orderId}</h3>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>Name: {order?.user?.username}</p>
              <p>Email: {order?.user?.email}</p>
              <p>
                {`${order?.shippingAddress?.address} ${order?.shippingAddress?.city}, ${order?.shippingAddress?.state} ${order?.shippingAddress?.zipCode} ${order?.shippingAddress?.country}`}{" "}
              </p>
              {order?.isDelivered ? (
                <Message type="success" message={"Delivered"} />
              ) : (
                <Message type="warning" message={"Not Delivered"} />
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{order?.paymentMethod}</p>
              {order?.isPaid ? (
                <Message type="success" message={`Paid on ${order?.paidAt}`} />
              ) : (
                <Message
                  type="warning"
                  message={"The Order has not paid yet"}
                />
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems?.length === 0 ? (
                <Message type="info" message={"Your cart is empty"} />
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems?.map((item) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} fluid rounded />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          <p>{`$${item.price} X ${item.qty} = $${(
                            item.price * item.qty
                          ).toFixed(2)}`}</p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <h2>Order Summary</h2>
            <ListGroup.Item>
              Items:
              {`$${itemPrice}`}
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: {`$${order?.shippingPrice}`}
            </ListGroup.Item>
            <ListGroup.Item>Tax: {`$${order?.taxPrice}`}</ListGroup.Item>
            <ListGroup.Item>Total: {`$${order?.totalPrice}`}</ListGroup.Item>
            {!order?.isDelivered && userInfo?.isAdmin && (
              <ListGroup.Item>
                <Button onClick={handleDeliver}>Mark As Delivered</Button>
              </ListGroup.Item>
            )}
            {!order?.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order?.totalPrice}
                    onSuccess={paymentSuccessHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderPage;
