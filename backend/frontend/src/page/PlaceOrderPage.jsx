import React, { useEffect } from "react";
import { Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, getMyOrders } from "../action/orderAction";
import Loader from '../components/Loader'
function PlaceOrderPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const { street, city, zipCode, country, state } = shippingAddress;
  const {order, success, loading,error} = useSelector(state => state.orderCreate)
  const navigate = useNavigate() 
  cart.cartItemPrice = parseFloat(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  );
  cart.shippingPrice = parseFloat(
    (cart.cartItemPrice >= 25 ? 0 : 6.99).toFixed(2)
  );
  cart.taxPrice = parseFloat((cart.cartItemPrice * 0.09).toFixed(2));
  cart.totalPrice = cart.cartItemPrice + cart.shippingPrice + cart.taxPrice;

  const handleClick = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        paymentMethod,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        shippingAddress: {
          address: street,
          city,
          country,
          zipCode,
        },
      })
    );
  };

  if (!paymentMethod){
    navigate('/payment')
  }

  useEffect(()=>{
    if (success){
      navigate(`/order/${order._id}`)
      dispatch({type:"ORDER_CREATE_RESET"})
      dispatch({type:"CART_CLEAR_ITEMS"})
      dispatch(getMyOrders())
      localStorage.removeItem('cartItems')
    }
  },[success,navigate,order,dispatch])
  return (
    <Container>
      <Row>
        <Col md={12}>
          <CheckoutStep step1={true} step2={true} step3={true} />
        </Col>
      </Row>
      <Row>
        {error && <Message type={'danger'} message={error}/>}
        {loading && <Loader/>}
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>{`${street} ${city}, ${state} ${zipCode} ${country}`} </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{paymentMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message type="info" message={"Your cart is empty"} />
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} fluid rounded />
                        </Col>

                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
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
            <ListGroup.Item>Items: {`$${cart.cartItemPrice}`}</ListGroup.Item>
            <ListGroup.Item>
              Shipping: {`$${cart.shippingPrice}`}
            </ListGroup.Item>
            <ListGroup.Item>Tax: {`$${cart.taxPrice}`}</ListGroup.Item>
            <ListGroup.Item>Total: {`$${cart.totalPrice}`}</ListGroup.Item>
            <ListGroup.Item>
              <Button type="primary" onClick={handleClick}>
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceOrderPage;
