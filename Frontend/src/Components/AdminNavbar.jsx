import { useNavigate, useLocation } from "react-router-dom";
import "../styles/adminnavbar.css";

function AdminNavbar(){

  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/admin";

  function handleLogout(){
    localStorage.removeItem("admin");
    navigate("/admin-login");
  }

  return(

    <div className="admin-navbar">

      <h2 className="admin-logo">🍕 PizzaStore Admin</h2>

      <div className="admin-nav-buttons">

        {!isDashboard && (
          <button onClick={()=>navigate("/admin")}>
            Dashboard
          </button>
        )}

        <button onClick={()=>navigate("/admin/orders")}>
          Orders
        </button>

        <button onClick={()=>navigate("/admin/menu")}>
          Menu
        </button>

        <button onClick={()=>navigate("/admin/add")}>
          Add Item
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  )

}

export default AdminNavbar;