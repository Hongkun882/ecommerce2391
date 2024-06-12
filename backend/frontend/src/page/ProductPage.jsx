import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  ListproductDetail,
  createProductReview,
} from "../action/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductPage() {
  const { productId } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: reviewCreateLoading,
    success: reviewCreateSuccess,
    error: reviewCreateError,
  } = useSelector((state) => state.productReviewCreate);
  useEffect(() => {
    dispatch(ListproductDetail(productId));
  }, [productId, dispatch, reviewCreateSuccess]);

  const AddToCartHandler = () => {
    navigate(`/cart?qty=${qty}&productId=${productId}`);
  };

  const handleReviewChange = (e) => {
    setReview((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReview({ rating: 0, comment: "" });
    dispatch(createProductReview(productId, review));
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="danger" message={error} />
      ) : (
        <Container>
          <Row>
            <Col md={3}>
              <Link to="/" className="btn btn-light my-3">
                Go Back
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt="phonet"
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem className="d-flex">
                  <Rating rating={product.rating} />
                  <span className="m-2">{product.ratingCount} reviews</span>
                </ListGroupItem>

                <ListGroupItem>
                  <span>
                    <strong>${product.price}</strong>
                  </span>
                </ListGroupItem>
                <ListGroupItem>
                  <p>{product.description}</p>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>price: ${product.price}</ListGroupItem>
                <ListGroupItem>
                  status:{" "}
                  {product.count >= 10
                    ? "In Stock"
                    : product.count >= 1
                    ? `${product.count} left`
                    : "Out of Stock"}
                </ListGroupItem>

                {product.count > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col sm={6}>Quantity</Col>
                      <Col sm={6}>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.count).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button
                    variant="primary"
                    disabled={product.count === 0}
                    onClick={AddToCartHandler}
                  >
                    {product.count === 0 ? "Not Available" : "Add to Cart"}
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <h2>Reviews</h2>
            <Col md={6}>
              {product.reviews.length === 0 ? (
                <Message type={"info"} message={"No review yet"} />
              ) : (
                <ListGroup>
                  {product.reviews.map((review) => (
                    <ListGroupItem key={review._id}>
                      <h5>{review.name}</h5>
                      <Rating rating={review.rating} />
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={6}>
              <h4>Write a Review</h4>
              {reviewCreateLoading && <Loader />}
              {reviewCreateError && (
                <Message type="danger" message={reviewCreateError} />
              )}

              {userInfo ? (
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    max={5}
                    size="sm"
                    className="mb-3"
                    id="rating"
                    value={review.rating}
                    required
                    onChange={handleReviewChange}
                  ></Form.Control>

                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    id="comment"
                    value={review.comment}
                    required
                    onChange={handleReviewChange}
                    className="mb-3"
                  ></Form.Control>
                  <Button type="submit">Submit Review</Button>
                </Form>
              ) : (
                <Message type={"info"} message={"Login to write a review"} />
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ProductPage;
