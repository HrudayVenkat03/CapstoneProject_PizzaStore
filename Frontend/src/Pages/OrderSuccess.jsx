import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../Services/OrderService";
import "../styles/ordersuccess.css";

function OrderSuccess(){

  const location = useLocation();
  const navigate = useNavigate();

  const orderState = location.state;

  const [order,setOrder] = useState(orderState);

  useEffect(()=>{

    if(!orderState) return;

    const id = orderState.orderId.replace("ORD-","");

    const interval = setInterval(async ()=>{

      try{

        const updatedOrder = await getOrderById(id);

        setOrder({
          orderId:`ORD-${updatedOrder.id}`,
          status:updatedOrder.status,
          items:updatedOrder.items,
          total:updatedOrder.totalPrice,
          address:updatedOrder.address,
          paymentMode:updatedOrder.paymentMode,
          eta:"30 - 40 mins"
        });

        if(updatedOrder.status !== "PENDING"){
          clearInterval(interval);
        }

      }catch(err){

        console.log(err);

      }

    },5000);

    return ()=>clearInterval(interval);

  },[]);


  if(!order){
    return <h2 style={{textAlign:"center"}}>No Order Data</h2>;
  }

  return(

    <div className="success-container">

      <div className="bill-card">

        {/* ---------- PENDING ORDER ---------- */}

        {order.status === "PENDING" && (

          <>
            <div className="success-icon">⏳</div>

            <h2>Order Placed</h2>

            <p className="order-id">
              Order ID: {order.orderId}
            </p>

            <p style={{textAlign:"center",marginTop:"10px"}}>
              Waiting for restaurant approval...
            </p>

            <p style={{textAlign:"center",color:"#777",marginTop:"5px"}}>
              You will receive confirmation shortly.
            </p>
          </>

        )}

        {/* ---------- APPROVED ORDER ---------- */}

        {order.status === "APPROVED" && (

          <>
            <div className="success-icon">✓</div>

            <h2>Order Confirmed</h2>

            <p className="order-id">
              Order ID: {order.orderId}
            </p>

            {order.items?.map((item,index)=>(
              
              <div key={index} className="bill-row">

                <span>{item.name} × {item.quantity}</span>

                <span>₹{item.price * item.quantity}</span>

              </div>

            ))}

            <div className="bill-total">

              <span>Total Paid</span>

              <span>₹{order.total}</span>

            </div>

            <div className="bill-info">

              <p><strong>Delivery Address:</strong></p>

              <p>{order.address}</p>

              <p><strong>Payment:</strong> {order.paymentMode}</p>

              <p><strong>ETA:</strong> {order.eta}</p>

            </div>
          </>

        )}

        {/* ---------- CANCELLED ORDER ---------- */}

        {order.status === "CANCELLED" && (

          <>
            <div className="success-icon" style={{background:"#e53935"}}>✕</div>

            <h2>Order Cancelled</h2>

            <p className="order-id">
              Order ID: {order.orderId}
            </p>

            <p style={{textAlign:"center",marginTop:"10px"}}>
              Unfortunately the restaurant cancelled your order.
            </p>
          </>

        )}

        <button
          className="home-btn"
          onClick={()=>navigate("/menu")}
        >
          Back to Menu
        </button>

      </div>

    </div>

  )

}

export default OrderSuccess;