import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({
  product,
  addToCart,
  onUpdateProduct,
  onDeleteProduct,
  isEditing,
  setEditProduct,
  showAdminButtons,
  onSelectProduct,
  selectedProducts
}) {
  const [editedProduct, setEditedProduct] = useState(product);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.image,
      title: product.title,
    });
    setShowPopup(true); 
    setTimeout(() => {
      setShowPopup(false); 
    }, 1000);
  };

  const handleEditProduct = () => {
    setEditProduct(product);
    setEditedProduct(product);
  };

  const handleDeleteProduct = () => {
    onDeleteProduct(product._id);
  };

  const handleUpdateProduct = () => {
    onUpdateProduct(editedProduct);
    setEditProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleCancelEdit = () => {
    setEditedProduct(product);
    setEditProduct(null);
  };

  const handleSelectProduct = () => {
    onSelectProduct(product._id);
  };

  return (
    <div className="product-card">
      {showAdminButtons && (
        <input
          type="checkbox"
          checked={selectedProducts.includes(product._id)}
          onChange={handleSelectProduct}
        />
      )}
      <img src={editedProduct.image} alt={editedProduct.title} />
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image"
            value={editedProduct.image}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdateProduct}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          {addToCart && <button onClick={handleAddToCart}>Add to Cart</button>}
          {showPopup && <div className="popup-message">Added to cart</div>}
          {showAdminButtons && (
            <>
              <button onClick={handleEditProduct}>Edit</button>
              <button onClick={handleDeleteProduct}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ProductCard;
