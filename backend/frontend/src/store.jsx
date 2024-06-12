import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  ProductListReducer,
  ProductDetailReducer,
  ProductDeleteReducer,
  ProductCreateReducer,
  ProductUpdateReducer,
  ProductReviewCreateReducer,
  TopProductReducer,
} from "./reducer/ProductReducer";
import { CartReducer } from "./reducer/CartReducer";
import {
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducer/UserReducer";
import { MyOrdersReducer, OrderCreateReducer, OrderDeliverReducer, OrderDetailReducer, OrderListReducer, OrderPayReducer } from "./reducer/OrderReducer";

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetail: ProductDetailReducer,
  productDelete: ProductDeleteReducer,
  productCreate: ProductCreateReducer,
  productUpdate: ProductUpdateReducer,
  productReviewCreate: ProductReviewCreateReducer,
  topProducts: TopProductReducer,
  cart: CartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList:userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: OrderCreateReducer,
  orderDetail: OrderDetailReducer,
  orderList: OrderListReducer,
  orderPay: OrderPayReducer,
  orderDeliver: OrderDeliverReducer,
  myOrders: MyOrdersReducer
});

const cartItemsFromLocal = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userFromLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromLocal = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromLocal = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromLocal,
    shippingAddress: shippingAddressFromLocal,
    paymentMethod: paymentMethodFromLocal,
  },
  userLogin: { userInfo: userFromLocal },
};

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
