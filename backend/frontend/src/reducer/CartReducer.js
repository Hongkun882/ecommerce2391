export const CartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM":
            const itemToAdd = action.payload
            const existItem = state.cartItems.find(item => item._id === itemToAdd._id)

            if (existItem) {
                return { ...state, cartItems: state.cartItems.map(item => item._id === itemToAdd._id ? itemToAdd : item) }
            }
            return { ...state, cartItems: [...state.cartItems, action.payload] }

        case "CART_REMOVE_ITEM":

            return { ...state, cartItems: state.cartItems.filter(item => item._id !== action.payload) }
        case "CART_SAVING_ADDRESS":
            return {
                ...state,
                shippingAddress: action.payload
            }

        case "CART_SAVING_PAYMENT_METHOD":
            return {
                ...state,
                paymentMethod: action.payload
            }

        case "CART_CLEAR_ITEMS":
            return {
                ...state,
                cartItems:[]
            }
        default:
            return state

    }
}

