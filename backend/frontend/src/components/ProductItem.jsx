import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function ProductItem({ product }) {


  console.log(product.image)
  return (
    <Card className="p-3 rounded my-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image}
          style={{ height: "auto" }}
        />
      </Link>

      <Card.Body>
        <Card.Title>
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text className="my-3">{product.description}</Card.Text>

        <div className="d-flex">
          <Rating rating={product.rating}/>
          <span className="ms-3">{product.ratingCount} reviews</span>
        </div>
          
        

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
