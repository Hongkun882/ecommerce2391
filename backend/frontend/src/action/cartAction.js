import axios from "axios";

export const addToCart = (_id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`https://ecommerce2391.onrender.com/api/products/${_id}`);
    dispatch({
        type: "CART_ADD_ITEM", payload: {
            _id: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            count: data.count,
            qty
        }
    })
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    


}

export const removeFromCart = (_id)=> async (dispatch, getState) => {

    dispatch({
        type: "CART_REMOVE_ITEM",
        payload: _id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async (dispatch, getState) =>{
    dispatch({
        type: "CART_SAVING_ADDRESS",
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress))
}
export const savePaymentMethod = (data) => async (dispatch, getState) =>{
    dispatch({
        type: "CART_SAVING_PAYMENT_METHOD",
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(getState().cart.paymentMethod))
}

