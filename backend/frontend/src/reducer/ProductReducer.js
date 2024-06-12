export const ProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case "PRODUCT_LIST_REQUEST":
            return { loading: true, products: [] }

        case "PRODUCT_LIST_SUCCESS":
            return { loading: false, products: action.payload.products, page: action.payload.page, numOfPage: action.payload.NumOfPage }
        case "PRODUCT_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export const ProductDetailReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case "PRODUCT_DETAIL_REQUEST":
            return { loading: true, state }

        case "PRODUCT_DETAIL_SUCCESS":
            return { loading: false, product: action.payload }
        case "PRODUCT_DETAIL_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export const ProductCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_CREATE_REQUEST":
            return { loading: true, state }

        case "PRODUCT_CREATE_SUCCESS":
            return { loading: false, product: action.payload, success: true }
        case "PRODUCT_CREATE_FAIL":
            return { loading: false, error: action.payload }

        case "PRODUCT_CREATE_RESET":
            return {}
        default:
            return state

    }
}

export const ProductUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_UPDATE_REQUEST":
            return { loading: true, state }

        case "PRODUCT_UPDATE_SUCCESS":
            return { loading: false, product: action.payload, success: true }
        case "PRODUCT_UPDATE_FAIL":
            return { loading: false, error: action.payload }

        case "PRODUCT_UPDATE_RESET":
            return {}
        default:
            return state

    }
}

export const ProductDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_DELETE_REQUEST":
            return { loading: true, state }

        case "PRODUCT_DELETE_SUCCESS":
            return { loading: false, success: true }
        case "PRODUCT_DELETE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export const ProductReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "PRODUCT_REVIEW_CREATE_REQUEST":
            return { loading: true, state }

        case "PRODUCT_REVIEW_CREATE_SUCCESS":
            return { loading: false, success: true }
        case "PRODUCT_REVIEW_CREATE_FAIL":
            return { loading: false, error: action.payload }

        case "PRODUCT_REVIEW_CREATE_RESET":
            return {}
        default:
            return state

    }
}

export const TopProductReducer = (state = {}, action) => {
    switch (action.type) {
        case "TOP_PRODUCT_REQUEST":
            return { loading: true, state }

        case "TOP_PRODUCT_SUCCESS":
            return { loading: false, topProductList: action.payload }
        case "TOP_PRODUCT_FAIL":
            return { loading: false, error: action.payload }

        case "TOP_PRODUCT_RESET":
            return {}
        default:
            return state

    }
}