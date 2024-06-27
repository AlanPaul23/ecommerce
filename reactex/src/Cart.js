import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

function Cart({ cartItems, addToCart, removeFromCart }) {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleIncreaseQuantity = (item) => {
    addToCart(item);
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item.quantity > 1) {
      removeFromCart(itemId);
    }
  };

  return (
    <div className="cart">
      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total: ${total.toFixed(2)}</h3>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      )}
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-header">
            <h4>{item.title}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>${item.price}</p>
          </div>
          <div className="quantity-controls">
            <button onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity === 1}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncreaseQuantity(item)}>+</button>
          </div>
          <img src={item.image} alt={item.title} />
        </div>
      ))}
    </div>
  );
}

export default Cart;