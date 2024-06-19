import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ListproductDetail, updateProduct } from "../action/productAction";
import axios from "axios";
function EditProductPage() {
  const [formdata, setFormdata] = useState({
    name: "",
    brand: "",
    category: "",
    description:"",
    price:0,
    count:0
  });
  const [file, setFile] = useState();
  const [uploadError, setUploadError] = useState(null);
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const { productId } = useParams();
  
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state) => state.userLogin);

  const {loading, error, product} = useSelector(state => state.productDetail);
  const {loading:loadingUpdate, error:errorUpdate, success: successUpdate} = useSelector(state => state.productUpdate);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (successUpdate){
      dispatch({type:'PRODUCT_UPDATE_RESET'})
        navigate('/admin/products')
    }else{
        if (!product|| Number(productId) !== product._id) {
        dispatch(ListproductDetail(productId));
      } else {
        setFormdata({name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        price: product.price,
        count: product.count,
        image: product.image
    });
        
      }
    }
      
    
  }, [dispatch, userInfo, product, productId, navigate, successUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProduct({...formdata},productId))
    if (file){
        try {
            const data = new FormData()
            data.append('_id', productId)
            data.append("image", file)
            const config = {header:{'Content-Type': 'multipart/form-data'}}

            await axios.post('https://ecommerce2391.onrender.com/api/products/upload/',data,config)
        } catch (error) {
            setUploadError("Uploading image file failed")
        }
    }
  };
  const handleImageChange = (e)=>{
    setFile(e.target.files[0])

  }

  if (error) {
    return <Message type={"danger"} message={error} />;
  }
  return (
    <Container>
      <Row>
        <Link to="/admin/products" className="mb-2">
          Go Back
        </Link>
      </Row>
      <Row>
        <FormContainer>
          <h1>Edit Product</h1>

          {(loadingUpdate || loading) && <Loader />}
          {errorUpdate && <Message type={"danger"} message={errorUpdate} />}
          {uploadError && <Message type={"danger"} message={uploadError} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your product name"
                value={formdata.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your product brand"
                value={formdata.brand}
                onChange={handleChange}
              />
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your product category"
                value={formdata.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your product description"
                value={formdata.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your product price"
                value={formdata.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="count">
              <Form.Label>Count</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your product count"
                value={formdata.count}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="photo">
              <Form.Control type='text' value={formdata.image}/>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                accept=".jpg, .jpeg, .png"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </FormContainer>
      </Row>
    </Container>
  );
}

export default EditProductPage;
