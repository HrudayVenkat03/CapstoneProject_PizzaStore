import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../Services/OrderService";
import AdminNavbar from "../Components/AdminNavbar";
import "../styles/admindashboard.css";

function AdminDashboard(){

  const [orders,setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    loadOrders();
  },[]);

  async function loadOrders(){

    try{

      const data = await getOrders();
      setOrders(data);

    }catch(err){

      console.log(err);

    }

  }

  /* DASHBOARD STATS */

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    o => o.status === "PENDING"
  ).length;

  const approvedOrders = orders.filter(
    o => o.status === "APPROVED"
  ).length;

  const totalRevenue = orders
    .filter(o => o.status === "APPROVED")
    .reduce((sum,o)=> sum + o.totalPrice,0);

  /* LATEST 7 ORDERS */

  const recentOrders = orders.slice(0,7);

  return(

    <div className="admin-dashboard">

      <AdminNavbar/>

      <div className="dashboard-container">

        <h2 className="dashboard-title">
          Admin Dashboard
        </h2>


        {/* DASHBOARD CARDS */}

        <div className="stats-grid">

          <StatCard
            title="Total Orders"
            value={totalOrders}
            onClick={()=>navigate("/admin/orders")}
          />

          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            onClick={()=>navigate("/admin/orders")}
          />

          <StatCard
            title="Approved Orders"
            value={approvedOrders}
            onClick={()=>navigate("/admin/orders")}
          />

          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue}`}
          />

        </div>


        {/* RECENT ORDERS */}

        <h3 className="recent-title">
          Recent Orders
        </h3>

        <div className="orders-card">

          <table className="orders-table">

            <thead>

              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {recentOrders.map(order=>(
                <tr key={order.id}>

                  <td>{order.id}</td>
                  <td>{order.userEmail}</td>
                  <td>₹{order.totalPrice}</td>

                  <td
                    className={
                      order.status === "APPROVED"
                      ? "status-approved"
                      : order.status === "PENDING"
                      ? "status-pending"
                      : "status-cancelled"
                    }
                  >
                    {order.status}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}


/* DASHBOARD CARD COMPONENT */

function StatCard({title,value,onClick}){

  return(

    <div
      className="stat-card"
      onClick={onClick}
      style={{cursor:"pointer"}}
    >

      <h3>{title}</h3>

      <p className="stat-number">
        {value}
      </p>

    </div>

  );

}

export default AdminDashboard;