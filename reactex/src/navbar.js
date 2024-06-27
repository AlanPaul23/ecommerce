import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Searchbar from './Searchbar';
import dropdown1 from './dropdown1.png';

const Header = ({ setSearchTerm, cartItems }) => {
  const [categories, setCategories] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountsDropdownOpen, setIsAccountsDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data));

    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAccountsDropdown = () => {
    setIsAccountsDropdownOpen(!isAccountsDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className='header-top'>
          <Link to="/" className="header-logo">
            <h1>EasyShop</h1>
          </Link>
          <Searchbar setSearchTerm={setSearchTerm} />
          {!loggedInUser && (
            <div className="accounts-dropdown">
              <div className="accounts-dropdown-toggle" onClick={toggleAccountsDropdown}>
                <h1>Accounts</h1>
                <img className='img1' src={dropdown1} alt='dropdown' />
              </div>
              {isAccountsDropdownOpen && (
                <div className="accounts-dropdown-menu">
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </div>
              )}
            </div>
          )}
          {loggedInUser ? (
            <div className="logged-in-user">
              <div className="user-info" onClick={toggleDropdown}>
                <h1>{loggedInUser.name}</h1>
                <img className='img1' src={dropdown1} alt='dropdown' />
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          <Link to="/cart" className='header-cart'>
            <span className="cart-count">{cartItems.length}</span>
            <h1>Cart</h1>
          </Link>
        </div>
        <nav className="header-nav">
          <ul className="nav-menu">
            {categories.map(category => (
              <li key={category}>
                <Link to={`/?category=${encodeURIComponent(category)}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;