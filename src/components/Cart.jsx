import { useCart } from "./CartContext";
import "../styles/cart.css";

function Cart() {
  const { getCart, updateQuantity, removeFromCart } = useCart();
  const cart = getCart();
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <main id="main-content" className="cart-page">
      <header className="cart-header">
        <h2>Shopping Cart</h2>
        <p aria-live="polite">{cart.length} items in your cart</p>
      </header>

      {cart.length === 0 ? (
        <section className="cart-empty">
          <h3>your cart is empty</h3>
          <p>add something from the store and it will appear here.</p>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-labelledby="cart-items-title">
            <div className="cart-section-heading">
              <h3 id="cart-items-title">items</h3>
              <span>price</span>
            </div>

            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p>${Number(item.price).toFixed(2)} each</p>
                  <div
                    className="cart-quantity"
                    role="group"
                    aria-label={`quantity for ${item.title}`}>
                    <button
                      type="button"
                      aria-label={`decrease ${item.title} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }>
                      -
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`increase ${item.title} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }>
                      +
                    </button>
                  </div>
                </div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                <button
                  className="cart-remove"
                  type="button"
                  aria-label={`remove ${item.title}`}
                  onClick={() => removeFromCart(item.id)}>
                  remove
                </button>
              </article>
            ))}
          </section>

          <aside className="cart-summary" aria-labelledby="summary-title">
            <h3 id="summary-title">order summary</h3>
            <dl>
              <div>
                <dt>subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
              <div>
                <dt>tax (10%)</dt>
                <dd>${tax.toFixed(2)}</dd>
              </div>
              <div className="summary-total">
                <dt>total</dt>
                <dd>${total.toFixed(2)}</dd>
              </div>
            </dl>
            <button className="checkout-button" type="button">
              checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
