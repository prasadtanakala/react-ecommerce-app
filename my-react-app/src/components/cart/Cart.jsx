import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import { FaTrash } from 'react-icons/fa';
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    }, []);
  
    const updateQuantity = (id, newQuantity) => {
      if (newQuantity < 1) return;
      const updatedCart = cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
  
    const removeItem = id => {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
  
    const calculateTotal = () =>
      cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
  
    const handleCheckout = () => {
      setShowConfirmation(true);
      localStorage.removeItem("cart");
      setCartItems([]);
      setTimeout(() => {
        setShowConfirmation(false);
        navigate("/cart");
      }, 3000);
    };
  
    if (cartItems.length === 0 && !showConfirmation) {
      return (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button className="continue-shopping" onClick={() => navigate("/home")}>
            Continue Shopping
          </button>
        </div>
      );
    }
  return (
    <div className="cart-container">
    <div className="cart-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h1>Your Shopping Cart</h1>
    </div>

    <div className="cart-items-container">
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <div className="item-image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="item-details">
            <h3 className="item-title">{item.title}</h3>
            <p className="item-price">${item.price}</p>
            <div className="quantity-controls">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button
            className="remove-item"
            onClick={() => removeItem(item.id)}
          >
     <FaTrash />
          </button>
        </div>
      ))}
    </div>

    <div className="cart-summary">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <div>
          Product item name and Quantity : 
             {
              cartItems.map((items)=>(
               <div className='product-name' key={items.id}>
                <span>{items.title}</span>
                <span>{items.price * items.quantity} X {items.quantity}</span>
               </div>
              ))
             }
        </div>
      
      </div>
      <div className="summary-row total">
        <span>Total:</span>
        <span>${calculateTotal()}</span>
      </div>
      <button
        className="checkout-button"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>

    {showConfirmation && (
      <div className="confirmation-popup">
        <div className="confirmation-content">
          <svg viewBox="0 0 24 24" className="checkmark">
            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
          </svg>
          <h3>Order Placed Successfully!</h3>
          <p>Thank you for your purchase.</p>
        </div>
      </div>
    )}
  </div>
  )
}

export default Cart