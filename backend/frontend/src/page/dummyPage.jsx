import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail, payOrder } from '../action/orderAction';
import MyCarousel from '../components/Carousel';

function DummyPage() {
    
    const dispatch = useDispatch()
    const {successPay} = useSelector(state => state.orderPay)
    const handleClick = ()=>{
        dispatch(payOrder("23"))
    }
    const orderDetail = useSelector((state) => state.orderDetail);
  const { order, error, loading } = orderDetail;
    useEffect(()=>{
        if(successPay){
            console.log("Hello")
            dispatch(getOrderDetail("23"))
        }
    },[successPay,dispatch,order])
    
  return (
    <MyCarousel/>
  )
}

export default DummyPage