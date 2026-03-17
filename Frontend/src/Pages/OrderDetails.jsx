import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/orderdetails.css";

function OrderDetails() {

  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    if(!token) return;

    fetch(`http://localhost:8083/orders/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(res => {

      if(!res.ok){
        throw new Error("Failed to fetch order");
      }

      return res.json();

    })
    .then(data => {
      setOrder(data);
    })
    .catch(()=>{
      setOrder(null);
    });

  }, [id, token]);

  if (!order) {
    return <p className="loading">Loading...</p>;
  }

  return (

    <div className="bill-container">

      <div className="bill-card">

        <h2 className="bill-title">🧾 Order Invoice</h2>

        <div className="bill-info">
          <p><b>Order ID:</b> #{order.id}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Date:</b> {order.createdAt}</p>
          <p><b>Payment:</b> {order.paymentMode}</p>
          <p><b>Address:</b> {order.address}</p>
        </div>

        <div className="divider"></div>

        <table className="invoice-table">

          <thead>
            <tr>
              <th className="col-item">Item</th>
              <th className="col-qty">Qty</th>
              <th className="col-price">Price</th>
              <th className="col-total">Total Amount</th>
            </tr>
          </thead>

          <tbody>

            {order.items && order.items.map(item => (

              <tr key={item.id}>

                <td className="col-item">
                  {item.name}
                </td>

                <td className="col-qty">
                  {item.quantity}
                </td>

                <td className="col-price">
                  ₹{item.price}
                </td>

                <td className="col-total">
                  ₹{item.price * item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="divider"></div>

        <div className="bill-total">
          <span>Total</span>
          <span>₹{order.totalPrice}</span>
        </div>

      </div>

    </div>

  );

}

export default OrderDetails;