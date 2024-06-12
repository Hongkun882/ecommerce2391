export const OrderCreateReducer = (state = {}, action) => {

    switch(action.type){
        case 'ORDER_CREATE_REQUEST':
            return {loading: true};

        case 'ORDER_CREATE_SUCCESS':
            return {loading: false, success:true, order: action.payload}

        case 'ORDER_CREATE_FAIL':
            return {loading:false, error: action.payload}

        case 'ORDER_CREATE_RESET':
            return {}
        default:
            return state


    }

}

export const OrderDetailReducer = (state = {}, action) => {

    switch(action.type){
        case 'ORDER_DETAIL_REQUEST':
            return {loading: true};

        case 'ORDER_DETAIL_SUCCESS':
            return {loading: false, success:true, order: action.payload}

        case 'ORDER_DETAIL_FAIL':
            return {loading:false, error: action.payload}

        default:
            return state


    }

}

export const OrderPayReducer = (state = {}, action) => {

    switch(action.type){
        case 'ORDER_PAY_REQUEST':
            return {loadingPay: true};

        case 'ORDER_PAY_SUCCESS':
            return {loadingPay: false, successPay:true}

        case 'ORDER_PAY_FAIL':
            return {loadingPay:false, errorPay: action.payload}

        case 'ORDER_PAY_RESET':
            return {}
        default:
            return state


    }

}

export const MyOrdersReducer = (state = {}, action) => {

    switch(action.type){
        case 'MYORDER_REQUEST':
            return {loading: true};

        case 'MYORDER_SUCCESS':
            return {loading: false, myOrders: action.payload}

        case 'MYORDER_FAIL':
            return {loading:false, error: action.payload}

        case 'MYORDER_RESET':
            return {}
        default:
            return state

    }

}

export const OrderListReducer = (state = {}, action) => {

    switch(action.type){
        case 'ORDER_LIST_REQUEST':
            return {loading: true};

        case 'ORDER_LIST_SUCCESS':
            return {loading: false, orderList: action.payload}

        case 'ORDER_LIST_FAIL':
            return {loading:false, error: action.payload}

        case 'ORDER_LIST_RESET':
            return {}
        default:
            return state

    }

}

export const OrderDeliverReducer = (state = {}, action) => {

    switch(action.type){
        case 'ORDER_DELIVER_REQUEST':
            return {loading: true};

        case 'ORDER_DELIVER_SUCCESS':
            return {loading: false, successDelivered: true}

        case 'ORDER_DELIVER_FAIL':
            return {loading:false, error: action.payload}

        case 'ORDER_DELIVER_RESET':
            return {}
        default:
            return state

    }

}