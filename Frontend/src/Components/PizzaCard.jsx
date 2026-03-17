import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import "../styles/menu.css";

function PizzaCard({ pizza, showBadge }) {

  const { addToCart, decreaseQuantity, removeFromCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {

    if (pizza.stock === 0) {
      alert("This item is currently out of stock");
      return;
    }

    setQuantity(1);

    addToCart({
      ...pizza,
      quantity: 1
    });
  };

  const increaseQty = () => {

    if (quantity >= pizza.stock) {          //validation foe stock 
      alert("Maximum stock reached");
      return;
    }

    setQuantity(quantity + 1);

    addToCart({
      ...pizza,
      quantity: 1
    });
  };

  const decreaseQty = () => {

    if (quantity === 1) {
      setQuantity(0);
      removeFromCart(pizza.id);
      return;
    }

    setQuantity(quantity - 1);
    decreaseQuantity(pizza.id);
  };

  return (

    <div className="pizza-card">

      {/* CATEGORY LABEL ONLY FOR PIZZAS */}

      {showBadge && (
        <div className={`category-label ${pizza.category.toLowerCase()}`}>
          {pizza.category}
        </div>
      )}

      {/* Image */}

      <img
        // src={`/images/${pizza.imageUrl}`}
        src={`${pizza.imageUrl}`}
        alt={pizza.name}
        className="pizza-image"
      />

      <h3>{pizza.name}</h3>

      <p className="description">{pizza.description}</p>

      <p className="price">₹{pizza.price}</p>


      {/* Add / Quantity logic */}

      {pizza.stock === 0 ? (

        <button className="out-btn" disabled>
          Out of Stock
        </button>

      ) : quantity === 0 ? (

        <button
          className="add-btn"
          onClick={handleAdd}
        >
          Add
        </button>

      ) : (

        <div className="qty-control">

          <button onClick={decreaseQty}>-</button>

          <span>{quantity}</span>

          <button onClick={increaseQty}>+</button>

        </div>

      )}

    </div>
  );
}

export default PizzaCard;