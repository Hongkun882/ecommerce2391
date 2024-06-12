import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import CheckoutStep from "../components/CheckoutStep";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../action/cartAction";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const dispatch = useDispatch();
  const {paymentMethod} = useSelector(state => state.cart)
  const [payment, setPayment] = useState(paymentMethod);
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(savePaymentMethod(payment))
   navigate('/place-order')
  };
  const handleChange = (e)=>{

    setPayment(e.target.value)
  }

  return (
    <FormContainer>
      <CheckoutStep step1={true} step2={true} />

      <Form onSubmit={handleSubmit}>
        <Form.Label as={"legend"}>Select Payment Method</Form.Label>
        <Form.Check
          type="radio"
          label="PayPal"
          name="payment"
          id="PayPal"
          value={"PayPal"}
          onChange={handleChange}
          checked = {payment === 'PayPal'}
          required
        />
        <Form.Check
          type="radio"
          label="Credit Card"
          name="payment"
          id="CreditCard"
          value={"CreditCard"}
          onChange={handleChange}
          checked = {payment === 'CreditCard'}
          required
        />

        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage;
