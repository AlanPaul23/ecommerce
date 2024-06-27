import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cartItems, total, setCartItems }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to process the order here
    console.log('Order submitted:', {
      name,
      address,
      city,
      state,
      zip,
      paymentMethod,
      cartItems,
      total,
    });
    // Reset form fields and cart items after successful submission
    setName('');
    setAddress('');
    setCity('');
    setState('');
    setZip('');
    setPaymentMethod('');
    setCartItems([]);
    setOrderPlaced(true);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {orderPlaced ? (
        <div className="order-placed">
          <h3>Order Placed Successfully!</h3>
          <p>Thank you for your order.</p>
        </div>
      ) : (
        <>
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} />
                <div className="checkout-item-details">
                  <h4>{item.title}</h4>
                  <p>
                    Quantity: {item.quantity} x ${item.price}
                  </p>
                  <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <p className="checkout-total">Total: ${total.toFixed(2)}</p>
          </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip">ZIP Code</label>
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment-method">Payment Method</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paytm">PayTm</option>
          </select>
        </div>
        <button type="submit" className="checkout-btn">
          Place Order
        </button>
      </form>
      </>
  )}
    </div>
  );
};

export default Checkout;