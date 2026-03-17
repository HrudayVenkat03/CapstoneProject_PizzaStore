import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (pizza) => {

    setCartItems((prevCart) => {

      const existingItem = prevCart.find(
        (item) => item.id === pizza.id
      );

      // If already in cart → increase quantity
      if (existingItem) {

        if (existingItem.quantity >= existingItem.stock) {
          alert("Maximum stock reached");
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // If new item
      if (pizza.stock === 0) {
        alert("This item is out of stock");
        return prevCart;
      }

      return [...prevCart, { ...pizza, quantity: 1 }];

    });

  };

  // Increase quantity
  const increaseQuantity = (id) => {

    setCartItems((prevCart) =>

      prevCart.map((item) => {

        if (item.id === id) {

          if (item.quantity >= item.stock) {
            alert("Maximum stock reached");
            return item;
          }

          return {
            ...item,
            quantity: item.quantity + 1
          };
        }

        return item;
      })

    );

  };

  // Decrease quantity
  const decreaseQuantity = (id) => {

    setCartItems((prevCart) =>

      prevCart
        .map((item) => {

          if (item.id === id) {

            if (item.quantity === 1) {
              return null; // remove item
            }

            return {
              ...item,
              quantity: item.quantity - 1
            };
          }

          return item;

        })
        .filter(Boolean)

    );

  };

  // Remove item
  const removeFromCart = (id) => {

    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );

  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
      }}
    >

      {children}

    </CartContext.Provider>

  );

};