import axios from "axios";

export const Listproducts = (keyword,page) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_LIST_REQUEST" });
        let query;
        if (!keyword && !page){
            query=``
        }
        else if (!keyword && page){
            query=`?&page=${page}`
        }
        else if (keyword && !page){
            query=`?keyword=${keyword}`
        }
        
        else{
            query=`?keyword=${keyword}&page=${page}`
        }
        
        const { data } = await axios.get(`http://localhost:8000/api/products/${query}`);
        dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "PRODUCT_LIST_FAIL", payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const ListproductDetail = (_id) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_DETAIL_REQUEST" });
        const { data } = await axios.get(`http://localhost:8000/api/products/${_id}/`);
        dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data })
    } catch (error) {
        dispatch({
            type: "PRODUCT_DETAIL_FAIL", payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        })
    }
}

export const deleteProduct = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: "PRODUCT_DELETE_REQUEST" });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`http://localhost:8000/api/products/${_id}/delete/`, config);
        dispatch({ type: "PRODUCT_DELETE_SUCCESS" })
    } catch (error) {
        dispatch({
            type: "PRODUCT_DELETE_FAIL", payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "PRODUCT_CREATE_REQUEST" });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.post("http://localhost:8000/api/products/create/",{}, config);
        dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload:data })
    } catch (error) {
        dispatch({
            type: "PRODUCT_CREATE_FAIL", payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        })
    }
}

export const updateProduct = (product,_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: "PRODUCT_UPDATE_REQUEST" });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.put(`http://localhost:8000/api/products/${_id}/update/`,product, config);
        dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload:data, success:true
    
    
    
    
    })
    } catch (error) {
        dispatch({
            type: "PRODUCT_UPDATE_FAIL", payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        })
    }
}

export const createProductReview = (_id,review_data) => async (dispatch, getState) => {
    try {
        dispatch({ type: "PRODUCT_REVIEW_CREATE_REQUEST" });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await axios.post(`http://localhost:8000/api/products/${_id}/create-review/`,review_data, config);
        dispatch({ type: "PRODUCT_REVIEW_CREATE_SUCCESS" })
    } catch (error) {
        
    }
}

export const getTopProducts = () => async (dispatch) => {

    try {
        dispatch({type: "TOP_PRODUCT_REQUEST"})
        const {data} = await axios.get("http://localhost:8000/api/products/top-products/")
        dispatch({type: "TOP_PRODUCT_SUCCESS", payload: data})
    } catch (error) {
        dispatch({
            type: "TOP_PRODUCT_FAIL", payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        })
    }
}