import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import "../Styles/Product.css"
function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ];
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);
  



  const handleCategoryFilter = event => {
    setSelectedCategory(event.target.value);
  };

  const handleSort = direction => {
    setSortDirection(direction);
  };
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
  

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'price', headerName: 'Price', width: 90 },
    {
      field: 'images',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => {
        const imgSrc = params.row.images[0];
        return <img src={imgSrc} alt={params.row.name} height="50" />;
      },
    },
    {
      field: 'details',
      headerName: 'Details',
      width: 100,
      renderCell: (params) => (
        <Link to={`/products/${params.id}`}>View Details</Link>
      ),
    },
  ];

  if (loading) {
    return <img style={{height:"150px",width:"150px",marginTop:"12%"}} src="https://media.tenor.com/t5DMW5PI8mgAAAAi/loading-green-loading.gif" alt="Loading"/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="product-list">
    <div className="product-list-controls">
      <div className="search">
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search Products" />

      </div>
      <div className="category-filter">
       <select value={selectedCategory} onChange={handleCategoryFilter}>
    <option value="">All Categories</option>
    {categories.map(category => (
      <option key={category} value={category}>{category}</option>
    ))}
  </select>
      </div>
      <div className="sort-buttons">
        <button onClick={() => handleSort('asc')}>Sort by Price (Low to High)</button>
        <button onClick={() => handleSort('desc')}>Sort by Price (High to Low)</button>
      </div>
    </div>
    <div className="product-list-table" style={{ height: 400, width: '100%' }}>
      <DataGrid rows={sortedProducts} columns={columns} pageSize={10} />
    </div>
  </div>
  
);
}

export default ProductList;




