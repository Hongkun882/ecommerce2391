import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import Carousel from "react-bootstrap/Carousel";
import { getTopProducts } from "../action/productAction";

function MyCarousel() {
  const dispatch = useDispatch();
  const { topProductList, loading, error } = useSelector(
    (state) => state.topProducts
  );
  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message type={"danger"} message={error} />;
  }
  return (
    <Carousel pause="hover" className="bg-dark" style={{height:"300px"}}>
      {topProductList?.map((product) => (
        <Carousel.Item>
          <Link to={`/product/${product._id}`} key={product._id}>
            <Image
              src={product.image}
              alt="image"
              fluid
              className="d-block mx-auto rounded-circle p-3"
              style={{height:"200px"}}
            ></Image>
            

              <h4 className="text-center text-white" >
                {product.name} (${product.price})
              </h4>
            
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;
