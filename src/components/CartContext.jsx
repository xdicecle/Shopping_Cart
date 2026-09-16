import { createContext, useContext, useState } from "react";

// Create the Cart Context
const CartContext = createContext();

//Create the Cart Provider that hold the cart and the function to add items to the cart
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function getCart() {
    return cart;
  }

  function addToCart(item, quantity) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
              }
            : cartItem,
        );
      }

      return [...currentCart, { ...item, quantity }];
    });
  }

  function updateQuantity(itemId, quantity) {
    if (quantity < 1) {
      setCart((currentCart) =>
        currentCart.filter((item) => item.id !== itemId),
      );
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(itemId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  }

  //cart count method for the navigation
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ addToCart, cartCount, getCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

//custom hook for cart context
export function useCart() {
  return useContext(CartContext);
}
