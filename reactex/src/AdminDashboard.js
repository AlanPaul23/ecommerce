// Filename: AdminDashboard.js
import React, { useState } from 'react';
import './AdminDashboard.css';
import { authenticationToken, getHeader } from './util';

const AdminDashboard = ({
  onClose,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  editProduct,
  setEditProduct,
}) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    title: '',
    price: '',
    image: '',
  });

  const categories = ["Men's Clothing", "Women's Clothing", "Jewelery", "Electronics"]; // Example categories
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [newProductCategory, setNewProductCategory] = useState(categories[0]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.title || !newProduct.price || !newProduct.image) {
      console.error('All fields must be filled out.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify({ ...newProduct, category: newProductCategory }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      console.log('New product data:', data);
      onAddProduct(data); // Calling parent function to update the state in App.js
      setNewProduct({
        name: '',
        title: '',
        price: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const handleUpdateProduct = async () => {
    if (editProduct) {
      try {
        await onUpdateProduct(editProduct);
        setEditProduct(null);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };


  const handleDeleteProduct = async () => {
    if (editProduct) {
      try {
        await onDeleteProduct(editProduct._id);
        setEditProduct(null);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    console.log('Selected category:', category);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h1>Product Dashboard</h1>
        <div className="add-product">
          <h2>Add Product</h2>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            placeholder="Product title"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Product Price"
          />
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            placeholder="Product Image URL"
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Product category"
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
        {editProduct && (
          <div className="edit-product">
            <h2>Edit Product</h2>
            <input
              type="text"
              name="name"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
              placeholder="Product Name"
            />
            <input
              type="text"
              name="title"
              value={editProduct.title}
              onChange={(e) =>
                setEditProduct({ ...editProduct, title: e.target.value })
              }
              placeholder="Product title"
            />
            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
              placeholder="Product Price"
            />
            <input
              type="text"
              name="image"
              value={editProduct.image}
              onChange={(e) =>
                setEditProduct({ ...editProduct, image: e.target.value })
              }
              placeholder="Product Image URL"
            />
            <button onClick={handleUpdateProduct}>Save Changes</button>
            <button onClick={handleDeleteProduct}>Delete Product</button>
            <button onClick={() => setEditProduct(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
