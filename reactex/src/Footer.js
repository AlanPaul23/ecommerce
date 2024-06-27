import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About</h4>
          <p>
            EasyShop is an online shopping platform that provides a seamless shopping experience for all your needs.
          </p>
        </div>
        <div className="footer-section footer-section1">
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>Return Policy</li>
            <li>Shipping Information</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EasyShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;