import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './Product.css';
import { useSearchParams, useLocation } from 'react-router-dom';
import { getHeader } from './util';

function Product({
  addToCart,
  searchTerm,
  onUpdateProduct,
  onDeleteProduct,
  editProduct,
  setEditProduct,
  showAdminButtons,
  onDeleteSelectedProducts,
  onDeleteAllProducts
}) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Set number of products per page to 10

  // Calculate the indices of the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const isAdminRoute = location.pathname === '/admin';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

    fetchProducts();
  }, [searchTerm, searchParams]);

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/delete-multiple', {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify({ productIds: selectedProducts }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      console.log(data.message);
      setProducts(products.filter(product => !selectedProducts.includes(product._id)));
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error deleting selected products:', error);
    }
  };


  const handleDeleteByCategory = async (category) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/category/${category}`, {
        method: 'DELETE',
        headers: getHeader()
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      console.log(data.message);
      setProducts(products.filter(product => product.category !== category));
    } catch (error) {
      console.error('Error deleting products by category:', error);
    }
  };

  return (
    <div className="product-container" style={{ minHeight: '100vh' }}>
      {isAdminRoute && (
        <div className="bulk-actions">
          <button onClick={handleDeleteSelected} disabled={selectedProducts.length === 0}>Delete Selected</button>
          <button onClick={() => handleDeleteByCategory("electronics")}>Delete Electronics</button>
          <button onClick={() => handleDeleteByCategory("jewelery")}>Delete Jewelery</button>
          <button onClick={() => handleDeleteByCategory("men's clothing")}>Delete men's clothing</button>
          <button onClick={() => handleDeleteByCategory("women's clothing")}>Delete women's clothing</button>
        </div>
      )}
      <div className="product-page">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={isAdminRoute ? undefined : addToCart}
              onUpdateProduct={onUpdateProduct}
              onDeleteProduct={onDeleteProduct}
              isEditing={editProduct && editProduct._id === product._id}
              setEditProduct={setEditProduct}
              showAdminButtons={isAdminRoute}
              onSelectProduct={handleSelectProduct}
              selectedProducts={selectedProducts}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Product;
