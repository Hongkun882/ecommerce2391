import React, { useEffect } from "react";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Listproducts, createProduct, deleteProduct } from "../action/productAction";
import { IoMdAdd } from "react-icons/io";
import Paginate from "../components/Paginate";
import { useSearchParams } from "react-router-dom";

function ProductListPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { products, loading, error, page:currentPage, numOfPage } = useSelector(
    (state) => state.productList
  );
  const {success: successDelete, loading: loadingDelete, error: errorDelete} = useSelector(state=> state.productDelete)
  const {success: successCreate, loading: loadingCreate, error: errorCreate, product: productCreate} = useSelector(state=>state.productCreate) 
  
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page"); 
  useEffect(() => {

    if (!userInfo) {
      navigate("/login");
    } 
    
    if(successCreate){
      dispatch({type:"PRODUCT_CREATE_RESET"})
      navigate(`/admin/product/${productCreate._id}`)
    }
    else {
      dispatch(Listproducts(null,page));
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, productCreate,page]);

  const handleEdit = (_id) => {
    navigate(`/admin/product/${_id}`);
  };
  const handleDelete = (_id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      dispatch(deleteProduct(_id));
    }
  };
  const handleClick = ()=>{
    dispatch(createProduct())
  }
  if (loading || loadingDelete || loadingCreate) {
    return <Loader />;
  }
  if (error) {
    return <Message type={"danger"} message={error} />;
  }
  if (userInfo && !userInfo.isAdmin){
    return <Message type={"danger"} message={"You do not have permission to perform action"} />;
  }
  return (
    <Container>
        {errorDelete && <Message type={"danger"} message={errorDelete} />}
        {errorCreate && <Message type={"danger"} message={errorCreate} />}
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end"><Button className="my-3" onClick={handleClick}><IoMdAdd className="me-1"/>Create Product</Button>
          
        </Col>
      </Row>
      <Row>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    size="sm"
                    className="m-1"
                    onClick={() => {
                      handleEdit(product._id);
                    }}
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="m-1"
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                  >
                    <FaRegTrashCan />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Paginate page={currentPage} pages={numOfPage} isAdmin={true}/>
      </Row>
    </Container>
  );
}

export default ProductListPage;
