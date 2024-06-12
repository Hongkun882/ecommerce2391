import axios from "axios"

export const createOrder = (order) => async(dispatch, getState) => {

    try {
        dispatch({ type: 'ORDER_CREATE_REQUEST' })
        const { userInfo } = getState().userLogin

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post("http://localhost:8000/api/orders/add/",order, config)
        dispatch({type: "ORDER_CREATE_SUCCESS", payload:data})


    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }

}

export const getOrderDetail = (_id) => async(dispatch, getState) => {

    try {
       
        dispatch({ type: 'ORDER_DETAIL_REQUEST' })
        const { userInfo } = getState().userLogin

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get(`http://localhost:8000/api/orders/${_id}/`, config)
        dispatch({type: "ORDER_DETAIL_SUCCESS", payload:data})


    } catch (error) {
        dispatch({
            type: 'ORDER_DETAIL_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }

}

export const payOrder = (_id,paymentResult) => async(dispatch, getState) => {

    try {
       
        dispatch({ type: 'ORDER_PAY_REQUEST' })
        const { userInfo } = getState().userLogin
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await axios.put(`http://localhost:8000/api/orders/${_id}/pay`,paymentResult, config)
        dispatch({type: "ORDER_PAY_SUCCESS"})


    } catch (error) {
        dispatch({
            type: 'ORDER_PAY_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }

}

export const getMyOrders = () => async(dispatch, getState) => {

    try {
       
        dispatch({ type: 'MYORDER_REQUEST' })
        const { userInfo } = getState().userLogin
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get(`http://localhost:8000/api/orders/myorders/`, config)
        dispatch({type: "MYORDER_SUCCESS", payload: data})


    } catch (error) {
        dispatch({
            type: 'MYORDER_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }

}

export const getOrderList = () => async(dispatch, getState) => {

    try {
       
        dispatch({ type: 'ORDER_LIST_REQUEST' })
        const { userInfo } = getState().userLogin
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get(`http://localhost:8000/api/orders/`, config)
        dispatch({type: "ORDER_LIST_SUCCESS", payload: data})


    } catch (error) {
        dispatch({
            type: 'ORDER_LIST_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }

}

export const deliverOrder = (_id) => async(dispatch, getState) => {

    try {
       
        dispatch({ type: 'ORDER_DELIVER_REQUEST' })
        const { userInfo } = getState().userLogin
        const token = userInfo.token
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        console.log(token)
        
        await axios.put(`http://localhost:8000/api/orders/${_id}/deliver/`,{}, config)
        dispatch({type: "ORDER_DELIVER_SUCCESS"})


    } catch (error) {
        dispatch({
            type: 'ORDER_DELIVER_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }

}