import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate} from "react-router-dom";
import { addToCart, removeFromCart } from "../action/cartAction";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import Message from "../components/Message";

function CartPage() {
  const location = useLocation();
  const productId = parseInt(new URLSearchParams(location.search).get("productId"));
  const qty = parseInt(new URLSearchParams(location.search).get("qty"));
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {userInfo} = useSelector(state=> state.userLogin)
  useEffect(() => {
    if (productId){
        dispatch(addToCart(productId, qty));
    }
    
  }, [dispatch, qty, productId]);

  const cart = useSelector((state) => state.cart);

  const removeCartItem = (_id) => {
    
    dispatch(removeFromCart(_id))
  };

  const handleCheckout = ()=>{
    if(!userInfo){
      navigate('/login')
    }  
    else{
      navigate('/address')
    }
  }

  const { cartItems } = cart;
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        { cartItems.length === 0 ? (<Message type={'info'} message={'Your cart is empty.'}></Message>):
        
        (
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item>
              <Row>
                <Col md={3}>
                  <Image src={item.image} fluid></Image>
                </Col>
                <Col md={2}>
                  <h5>{item.name}</h5>
                  <h5>${item.price}</h5>
                </Col>
                <Col md={3}>
                  <Form.Control
                    as={"select"}
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item._id, parseInt(e.target.value)))
                    }
                  >
                    {[...Array(item.count).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={3}>
                  <Button onClick={()=> removeCartItem(item._id)}>
                    <FaTrashAlt />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        )
        }
      </Col>

      <Col md={3}>
        <ListGroup variant="flush">
            <ListGroup.Item><h3>SubTotal: {cartItems.reduce((acc, item)=> acc + item.qty, 0)} Items</h3> </ListGroup.Item>
            <ListGroup.Item><h5>${cartItems.reduce((acc, item)=> acc + item.qty*item.price, 0).toFixed(2)}</h5></ListGroup.Item>
            <ListGroup.Item><Button disabled={cartItems.length === 0} onClick={handleCheckout}>Proceed to Checkout</Button></ListGroup.Item>
            
        </ListGroup>
            
        
        
      </Col>
    </Row>
  );
}

export default CartPage;
