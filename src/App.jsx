import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminProducts from "./components/Admin/AdminProducts";
import AddNewProducts from "./components/Admin/AddNewProducts";
import { Home } from "./components/Home/Home";
import AdminDetailProduct from "./components/Admin/AdminDetailProduct";
import { Admin } from "./components/Admin/Admin";
import { AdminLogin } from "./components/Admin/AdminLogin";
import { AccountAdmin } from "./components/Admin/AccountAdmin";
import { Headers } from "./components/Header/Headers";
import { DetailProduct } from "./components/DetailProduct/DetailProduct";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { Introduce } from "./components/About/Introduce";
import { ReturnPolicy } from "./components/About/ReturnPolicy";
import { PrivacyPolicy } from "./components/About/PrivacyPolicy";
import { TermsService } from "./components/About/TermsService";
import { ListProduct } from "./components/ListProduct/ListProduct";
import { Toaster } from "react-hot-toast";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Login/Register";
import { AccountClientHome } from "./components/AccountClient/AccountClientHome";
import { NotFound } from "./components/404/NotFound";
import { Cart } from "./components/Cart/Cart";
import { CheckOuts } from "./components/CheckOuts/CheckOuts";
import { DetailMyOrders } from "./components/AccountClient/DetailMyOrders";
import { AccountClient } from "./components/AccountClient/AccountClient";
import { ListMyOders } from "./components/AccountClient/ListMyOders";
import { ChangePassword } from "./components/AccountClient/ChangePassword";
import { ListOrdersAdmin } from "./components/Admin/ListOrdersAdmin";
import { ListCustomerAdmin } from "./components/Admin/ListCustomerAdmin";
import { DetailOrderAdmin } from "./components/Admin/DetailOrderAdmin";
import { DetailCustomerAdmin } from "./components/Admin/DetailCustomerAdmin";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/account" element={<AccountAdmin />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/generals" element={<Home />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AddNewProducts />} />
          <Route path="/admin/products/:id" element={<AdminDetailProduct />} />
          <Route path="/admin/orders" element={<ListOrdersAdmin />} />
          <Route path="/admin/customer" element={<ListCustomerAdmin />} />
          <Route path="/admin/customer/:id" element={<DetailCustomerAdmin />} />
          <Route path="/admin/orders/:id" element={<DetailOrderAdmin />} />

          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>

        <Route path="/" element={<Headers />}>
          <Route path="/" element={<Content />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/pages/about-us" element={<Introduce />} />
          <Route path="/pages/chinh-sach-doi-tra" element={<ReturnPolicy />} />
          <Route path="/pages/chinh-sach-bao-mat" element={<PrivacyPolicy />} />
          <Route path="/pages/dieu-khoan-dich-vu" element={<TermsService />} />
          <Route path="/collections/all" element={<ListProduct />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          {/* <Route path="/account" element={<AccountClientHome />} /> */}
          <Route path="/account/orders/:id" element={<DetailMyOrders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<AccountClientHome />}>
            <Route path="/account/change-info" element={<AccountClient />} />
            <Route path="/account/order" element={<ListMyOders />} />
            <Route path="/account/change-pass" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/checkout" element={<CheckOuts />}></Route>
      </Routes>
    </>
  );
}

export default App;
