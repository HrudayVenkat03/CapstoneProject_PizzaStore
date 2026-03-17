import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import "../styles/cart.css";

function Cart(){

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total,pizza)=> total + pizza.price * pizza.quantity,
    0
  );

  return(

    <div className="cart-container">

      <div className="cart-card">

        <h2 className="cart-title">🛒 Your Cart</h2>

        {/* EMPTY CART */}

        {cartItems.length === 0 && (

          <div className="empty-cart">

            <p>Your cart is empty</p>

            <button
              className="go-menu-btn"
              onClick={()=>navigate("/menu")}
            >
              Go Back To Menu
            </button>

          </div>

        )}

        {/* CART ITEMS */}

        {cartItems.map((pizza)=>(
          
          <div key={pizza.id} className="cart-item">

            {/* LEFT SIDE */}
            <div className="item-info">

              <img
                src={pizza.imageUrl}
                alt={pizza.name}
                className="cart-img"
              />

              <div>
                <strong>{pizza.name}</strong>
                <p>₹{pizza.price}</p>
              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="quantity-control">

              <button
                className="qty-btn"
                onClick={()=>decreaseQuantity(pizza.id)}
              >
                -
              </button>

              <span>{pizza.quantity}</span>

              <button
                className="qty-btn"
                onClick={()=>increaseQuantity(pizza.id)}
              >
                +
              </button>

              <button
                className="remove-btn"
                onClick={()=>removeFromCart(pizza.id)}
              >
                Remove
              </button>

            </div>

          </div>

        ))}

        {/* TOTAL + CHECKOUT */}

        {cartItems.length > 0 && (

          <>

            <div className="cart-total-row">

              <h3>Total Price: ₹{totalPrice}</h3>

              <span
                className="add-more"
                onClick={()=>navigate("/menu")}
              >
                + Add more items
              </span>

            </div>

            <button
              className="order-btn"
              onClick={()=>navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

          </>

        )}

      </div>

    </div>

  )

}

export default Cart;