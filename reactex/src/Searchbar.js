import React, { useState } from 'react';
import './Searchbar.css';
import { useNavigate } from 'react-router-dom';

function Searchbar({ setSearchTerm }) {
  const [searchTerm, setSearchTermLocal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
    navigate(`/products?category=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSearch}>
        <input
          className="inputsearch"
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTermLocal(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Searchbar;