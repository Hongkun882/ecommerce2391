import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { Listproducts } from "../action/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import MyCarousel from "../components/Carousel";

function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const {
    error,
    loading,
    products,
    page: currentPage,
    numOfPage,
  } = productList;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");
  useEffect(() => {
    dispatch(Listproducts(keyword, page));
  }, [dispatch, keyword, page]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="danger" message={error} />
      ) : (
        <Container>
          <h1>Recommend for you</h1>
          <MyCarousel />

          <h1>Latest Update</h1>
          <Row>
            {products.length === 0 ? (
              <Message
                type="info"
                message="No Products with the given keyword"
              />
            ) : (
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductItem product={product} />
                </Col>
              ))
            )}
          </Row>

          <Row>
            <Paginate
              pages={numOfPage}
              page={currentPage}
              keyword={keyword}
              isAdmin={false}
            />
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Home;
