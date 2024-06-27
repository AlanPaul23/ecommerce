import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Product';
import Cart from './Cart';
import Header from './navbar';
import Login from './login';
import Signup from './Signup';
import Footer from './Footer';
import Checkout from './Checkout';
import AdminDashboard from './AdminDashboard';
import Login1 from './Login1';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import { getHeader } from './util';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('logsss', getHeader());
        const response = await fetch('http://localhost:5000/api/products',{
          headers:getHeader()
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAddProduct = async (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const { _id, title, price, image, name } = updatedProduct;
      const updatedFields = {};

      if (title !== undefined) updatedFields.title = title;
      if (price !== undefined) updatedFields.price = price;
      if (image !== undefined) updatedFields.image = image;
      if (name !== undefined) updatedFields.name = name;

      if (!updatedFields.image) updatedFields.image = updatedProduct.image;
      if (!updatedFields.name) updatedFields.name = updatedProduct.name;

      const response = await fetch(`http://localhost:5000/api/products/update/${_id}`, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      setProducts(products.map(product => product._id === data._id ? data : product));
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    console.log('Deleting product with ID:', productId);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers:getHeader()
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      setProducts(products.filter(product => product._id !== productId));
      setEditProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleAdminDashboard = () => {
    setShowAdminDashboard(!showAdminDashboard);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login1" element={<Login1 />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute element={() => (
                <>
                  <button onClick={toggleAdminDashboard}>
                    {showAdminDashboard ? 'Hide Add' : 'Show Add'} Products
                  </button>
                  {showAdminDashboard && (
                    <div className="admin-dashboard-overlay">
                      <AdminDashboard
                        onClose={toggleAdminDashboard}
                        onAddProduct={handleAddProduct}
                        onUpdateProduct={handleUpdateProduct}
                        onDeleteProduct={handleDeleteProduct}
                        editProduct={editProduct}
                        setEditProduct={setEditProduct}
                      />
                    </div>
                  )}
                  <Product
                    products={products}
                    setProducts={setProducts}
                    editProduct={editProduct}
                    setEditProduct={setEditProduct}
                    addToCart={addToCart}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                    showAdminDashboard={showAdminDashboard}
                    toggleAdminDashboard={toggleAdminDashboard}
                    onAddProduct={handleAddProduct}
                  />
                </>
              )} />
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Header setSearchTerm={setSearchTerm} cartItems={cartItems} />
                <Product
                  products={products}
                  addToCart={addToCart}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header setSearchTerm={setSearchTerm} cartItems={cartItems} />
                <Cart
                  cartItems={cartItems}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <>
                <Header setSearchTerm={setSearchTerm} cartItems={cartItems} />
                <Product addToCart={addToCart} />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header setSearchTerm={setSearchTerm} cartItems={cartItems} />
                <Checkout cartItems={cartItems} total={total} setCartItems={setCartItems} />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
