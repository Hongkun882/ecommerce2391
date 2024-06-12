import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../action/cartAction'
import CheckoutStep from '../components/CheckoutStep'
import { useNavigate } from 'react-router-dom'

function AddressPage() {

    const dispatch = useDispatch()
    const {shippingAddress} = useSelector(state => state.cart)
    const navigate = useNavigate()
    const {street, city, zipCode, state, country} = shippingAddress
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress(formdata))
        navigate('/payment')
    }
    const [formdata, setFormdata] = useState({
        street,
        city,
        zipCode,
        state,
        country
    })
    const handleChange = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.id]: e.target.value
        })
    } 
  return (
    <FormContainer>
        <CheckoutStep step1={true}/>
      <h1>Shipping Address</h1>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Street"
            value={formdata.street}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={formdata.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="zipCode">
          <Form.Label>zipCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your zipCode"
            value={formdata.zipCode}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="state">
          <Form.Label>state</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your state"
            value={formdata.state}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country"
            value={formdata.country}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      
    </FormContainer>
  )
}

export default AddressPage