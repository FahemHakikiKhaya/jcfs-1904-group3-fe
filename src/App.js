import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MuiNavBar from "./component/navigation/users";

import LandingPage from "./pages/user/landingPage";
import ProductList from "./pages/user/productList";
import ProductListCategory from "./pages/user/productList/category";
import ProductListSearch from "./pages/user/productList/search";
import ProductDetail from "./pages/user/productDetail";
import Carts from "./pages/user/shoppingCart";
import Checkout from "./pages/user/checkout";
import TransactionStatus from "./pages/user/transactionStatus";

import Login from "./pages/login";
import Register from "./pages/register";

import AdminModifyProducts from "./pages/admin/warehouseAdmin/products";
import AdminSalesReport from "./pages/admin/warehouseAdmin/salesReport";
import AdminTransactions from "./pages/admin/warehouseAdmin/transaction";

function App() {
  return (
    <Router>
      <MuiNavBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/product-list" element={<ProductList />} />
        <Route
          path="/product-list/:category"
          element={<ProductListCategory />}
        />
        <Route
          path="/product-list/search/:keyWord"
          element={<ProductListSearch />}
        />
        <Route path="product-detail/:id" element={<ProductDetail />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/transaction/status" element={<TransactionStatus />} />

        <Route path="/admin/sales-report" element={<AdminSalesReport />} />
        <Route path="/admin/products" element={<AdminModifyProducts />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
      </Routes>
    </Router>
  );
}

export default App;
