import { useEffect, useState } from "react";
import {
  getOrders,
  approveOrder,
  cancelOrder
} from "../Services/OrderService";

import AdminNavbar from "../Components/AdminNavbar";
import "../styles/adminorders.css";

function AdminOrders(){

  const [orders,setOrders] = useState([]);

  useEffect(()=>{

    fetchOrders();

    const interval = setInterval(fetchOrders,5000);

    return ()=>clearInterval(interval);

  },[]);


  async function fetchOrders(){

    try{

      const data = await getOrders();
      setOrders(data);

    }catch(err){

      console.log(err);

    }

  }


  async function handleApprove(id){

    try{

      await approveOrder(id);
      fetchOrders();

    }catch(err){

      alert(err.message);

    }

  }


  async function handleCancel(id){

    try{

      await cancelOrder(id);
      fetchOrders();

    }catch(err){

      alert(err.message);

    }

  }


  return(

    <div className="admin-orders">

      <AdminNavbar/>

      <div className="orders-container">

        <h2 className="orders-title">
          All Orders
        </h2>

        <div className="orders-card">

          <table className="orders-table">

            <thead>

              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {orders.map(order=>(
                <tr key={order.id}>

                  <td>{order.id}</td>

                  <td>{order.userEmail}</td>


                  {/* ITEMS COLUMN */}

                  <td>

                    <div className="order-items">

                      {order.items && order.items.map((item,index)=>(
                        <div
                          key={index}
                          className="order-item"
                        >
                          {item.name} × {item.quantity}
                        </div>
                      ))}

                    </div>

                  </td>


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


                  <td>

                    {order.status === "PENDING" && (

                      <div className="order-actions">

                        <button
                          className="btn-approve"
                          onClick={()=>handleApprove(order.id)}
                        >
                          Approve
                        </button>

                        <button
                          className="btn-cancel"
                          onClick={()=>handleCancel(order.id)}
                        >
                          Cancel
                        </button>

                      </div>

                    )}

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default AdminOrders;