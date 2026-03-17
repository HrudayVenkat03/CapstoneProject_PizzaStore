import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "../styles/navbar.css";

function Navbar(){

  const { cartItems, clearCart } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  // hide navbar on auth pages
  if(
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/admin-login"
  ){
    return null;
  }

  const cartCount = cartItems.reduce(
    (total,item)=> total + item.quantity,
    0
  );

  function handleLogout(){

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");

    clearCart();

    navigate("/");
  }

  return(

    <nav className="navbar">

      {/* LOGO */}

      <div
        className="logo"
        onClick={()=>navigate("/menu")}
      >
        🍕 PizzaStore
      </div>


      {/* RIGHT NAV */}

      <div className="nav-links">

        {/* Hide Menu button if already on menu page */}
        {location.pathname !== "/menu" && (
          <Link to="/menu" className="nav-btn">
            🍕 Menu
          </Link>
        )}

        <Link to="/cart" className="nav-btn cart-btn">

          🛒 Cart

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}

        </Link>

        <Link to="/profile" className="nav-btn">
👤 Profile
</Link>

        {/* Logout styled same as menu/cart */}

        <button
          className="nav-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>

  )

}

export default Navbar;