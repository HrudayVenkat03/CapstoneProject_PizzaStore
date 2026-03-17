import { Routes, Route, useLocation } from "react-router-dom";

import Register from "./Pages/Register";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";

import { CartProvider } from "./Context/CartContext";
import Login from "./Pages/login";
import Navbar from "./Components/NavBar";

import OrderSuccess from "./Pages/OrderSuccess";
import Checkout from "./Pages/Checkout";
import AdminOrders from "./Pages/AdminOrders";
import AdminMenu from "./Pages/AdminMenu";

import AddItem from "./Pages/AddItem";
import EditItem from "./Pages/EditItem";
import Profile from "./Pages/Profile";
import OrderDetails from "./Pages/OrderDetails";


function AppContent(){

  const location = useLocation();

  /* hide normal navbar for admin pages */
  const isAdminPage = location.pathname.startsWith("/admin");

  return (

    <>
      {!isAdminPage && <Navbar />}

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/order/:id" element={<OrderDetails />} />

        <Route path="/home" element={<Menu />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/admin/menu" element={<AdminMenu />} />

        <Route path="/admin/add" element={<AddItem />} />

        <Route path="/admin/edit/:id" element={<EditItem />} />

      </Routes>
    </>
  );

}


function App(){

  return (

    <CartProvider>
      <AppContent />
    </CartProvider>

  );

}

export default App;