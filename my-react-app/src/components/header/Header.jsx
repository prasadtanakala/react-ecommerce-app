import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
import './Header.css'
const Header = () => {

    const navigate =useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/'); 
    };
  return (
   <>
     <header className="ecommerce-header">
      <div className="header-container">
        <Link to="/home" className="logo">
          Shopping
        </Link>
        
        <nav className="nav-links">
          <Link to="/home" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>
          
          <Link to="/cart" className="nav-link cart-link">
            <FaShoppingCart className="nav-icon" />
            <span>cart</span>
          </Link>

          
          <Link to="/pichart" className="nav-link">
            <span>Product pie chart</span>
          </Link>
          
          <button  onClick={handleLogout} className="nav-link logout-btn">
            <FaSignOutAlt  className="nav-icon" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
   </>
  )
}

export default Header