import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./page/Home";
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import ProductPage from "./page/ProductPage";
import CartPage from "./page/CartPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ProfilePage from "./page/ProfilePage";
import AddressPage from "./page/AddressPage";
import PaymentPage from "./page/PaymentPage";
import PlaceOrderPage from "./page/PlaceOrderPage";
import OrderPage from "./page/OrderPage";
import DummyPage from "./page/dummyPage";
import UserListPage from "./page/UserListPage";
import EditUserPage from "./page/EditUserPage";
import ProductListPage from "./page/ProductListPage";
import EditProductPage from "./page/EditProductPage";
import OrderListPage from "./page/OrderListPage";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductPage/>} />
          <Route path="/cart/*" element={<CartPage/>}></Route>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/address" element={<AddressPage/>} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/place-order" element={<PlaceOrderPage/>} />
          <Route path="/order/:orderId" element={<OrderPage/>} />
          <Route path="/admin/users" element={<UserListPage/>} />
          <Route path="/admin/user/:userId" element={<EditUserPage/>} />
          <Route path="/admin/products" element={<ProductListPage/>} />
          <Route path="/admin/product/:productId" element={<EditProductPage/>} />
          <Route path="/admin/orders" element={<OrderListPage/>} />
          <Route path="/dummy" element={<DummyPage/>} />
        </Routes>

      </main>
      <Footer />
    </Router>


  );
}

export default App;
