import { useState } from "react";
import { useCart } from "./CartContext";
import "../styles/store.css";

//card component to show each product on its own card
function Card({ item }) {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  function handleQuantityChange(e) {
    setQuantity(Math.max(1, Number(e.target.value) || 1));
  }

  function handleIncrease() {
    setQuantity(quantity + 1);
  }

  function handleDecrease() {
    setQuantity(Math.max(1, quantity - 1));
  }

  function handleAddToCart() {
    addToCart(item, quantity);
  }

  return (
    <div key={item.id} className="card">
      <img className="card-image" src={item.image} alt={item.title} />
      <div className="card-text">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-price">${item.price}</p>

        <div
          className="input-container"
          role="group"
          aria-label={`quantity for ${item.title}`}>
          <button
            className="sm-btn"
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label={`decrease ${item.title} quantity`}>
            -
          </button>
          <label className="visually-hidden" htmlFor={`quantity-${item.id}`}>
            quantity for {item.title}
          </label>
          <input
            className="card-input"
            id={`quantity-${item.id}`}
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button
            className="sm-btn"
            type="button"
            onClick={handleIncrease}
            aria-label={`increase ${item.title} quantity`}>
            +
          </button>
        </div>

        <button className="cart-btn" type="button" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
