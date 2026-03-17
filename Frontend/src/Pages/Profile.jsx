import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

function Profile(){

  const [orders,setOrders] = useState([]);

  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  useEffect(()=>{

    if(!userEmail || !token) return;

    fetch(`http://localhost:8083/orders/user/${userEmail}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res=>{
      if(!res.ok){
        return [];
      }
      return res.json();
    })
    .then(data=>{
      setOrders(Array.isArray(data) ? data : []);
    })
    .catch(()=>{
      setOrders([]);
    });

  },[userEmail,token]);

  return(

    <div className="profile-container">

      {/* ACCOUNT SECTION */}

      <h2 className="section-title">👤 My Account</h2>

      <div className="profile-card">

        {/* Avatar */}

        <div className="profile-avatar">
          {userName ? userName.charAt(0).toUpperCase() : "G"}
        </div>

        {/* Profile Info */}

        <div className="profile-info">

          <p><b>Name:</b> {userName || "Guest User"}</p>
          <p><b>Email:</b> {userEmail}</p>

          <div className="quick-actions">

            <button onClick={()=>navigate("/menu")}>
              🍕 Browse Menu
            </button>

            <button onClick={()=>navigate("/cart")}>
              🛒 View Cart
            </button>

          </div>

        </div>

      </div>


      {/* ORDERS SECTION */}

      <h2 className="section-title">📦 My Orders</h2>

      <div className="orders-list">

        {orders.length === 0 && (
          <div className="no-orders">
            <p>You haven't placed any orders yet 🍕</p>

            <button
              className="start-order-btn"
              onClick={() => navigate("/menu")}
            >
              🍕 Start Ordering
            </button>
          </div>
        )}

        {orders.map(order=>(
          
          <div
            key={order.id}
            className="order-card"
            onClick={()=>navigate(`/order/${order.id}`)}
          >

            <div className="order-left">

              <span className="order-id">
                Order #{order.id}
              </span>

              <span className="order-price">
                ₹{order.totalPrice}
              </span>

            </div>

            <span className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Profile;