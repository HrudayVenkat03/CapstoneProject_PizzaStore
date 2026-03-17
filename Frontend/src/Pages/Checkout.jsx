import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { placeOrder } from "../Services/OrderService";
import "../styles/checkout.css";

function Checkout(){

  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [addressLine1,setAddressLine1] = useState("");
  const [addressLine2,setAddressLine2] = useState("");
  const [phone,setPhone] = useState("");
  const [orderPlaced,setOrderPlaced] = useState(false);

  const deliveryETA = "30 - 40 mins";

  useEffect(()=>{

    if(cartItems.length === 0 && !orderPlaced){
      navigate("/menu");
    }

  },[cartItems,navigate,orderPlaced]);

  const totalPrice = cartItems.reduce(
    (total,item)=> total + item.price * item.quantity,
    0
  );

  async function handleConfirmOrder(){

    if(addressLine1.trim()==="" || phone.trim()===""){
      alert("Please enter address and phone number");
      return;
    }

    if(phone.length !== 10){
      alert("Enter valid 10 digit phone number");
      return;
    }

    try{

      const items = cartItems.map(item => ({
        pizzaId:item.id,
        name:item.name,
        price:item.price,
        quantity:item.quantity
      }));

      const fullAddress =
        addressLine2.trim() !== ""
        ? `${addressLine1}, ${addressLine2}, Phone: ${phone}`
        : `${addressLine1}, Phone: ${phone}`;

      const orderData={
        address:fullAddress,
        paymentMode:"COD",
        totalPrice:totalPrice,
        items:items
      };

      const response = await placeOrder(orderData);

      console.log("Order response:",response);

      const backendId = response?.id;

      const orderId = backendId
        ? `ORD-${backendId}`
        : `ORD-${Date.now()}`;

      setOrderPlaced(true);

      clearCart();

      navigate("/order-success",{
        state:{
          orderId:orderId,
          status:"PENDING"
        }
      });

    }
    catch(err){

      console.error(err);
      alert("Failed to place order");

    }

  }

  return(

    <div className="checkout-container">

      <div className="checkout-grid">

        {/* Delivery Details */}

        <div className="checkout-form">

          <h2>Delivery Details</h2>

          <label>Address Line 1</label>
          <input
            type="text"
            placeholder="House / Flat / Street"
            value={addressLine1}
            onChange={(e)=>setAddressLine1(e.target.value)}
          />

          <label>Address Line 2</label>
          <input
            type="text"
            placeholder="Area / Landmark"
            value={addressLine2}
            onChange={(e)=>setAddressLine2(e.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter 10 digit mobile number"
            value={phone}
            maxLength="10"
            onChange={(e)=>{
              const value = e.target.value.replace(/\D/g,"");
              setPhone(value);
            }}
          />

          <div className="payment-box">

            <h3>Payment Method</h3>

            <div className="cod-box">
              💵 Cash on Delivery
            </div>

            <p style={{marginTop:"12px",color:"#666",fontSize:"14px"}}>
              🚚 Estimated Delivery: <strong>{deliveryETA}</strong>
            </p>

          </div>

        </div>

        {/* Order Summary */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cartItems.map(item=>(
            <div key={item.id} className="summary-item">

              <div className="summary-left">

                <img
                  src={item.imageUrl}
                  alt={item.name}
                />

                <span>{item.name}</span>

              </div>

              <span>
                ₹{item.price} × {item.quantity}
              </span>

            </div>
          ))}

          <div className="summary-total">
            Total: ₹{totalPrice}
          </div>

          <button
            className="back-btn"
            onClick={()=>navigate("/cart")}
          >
            ← Back to Cart
          </button>

          <button
            className="confirm-btn"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>

        </div>

      </div>

    </div>

  )

}

export default Checkout;