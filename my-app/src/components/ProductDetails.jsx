import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/ProductDetails.css"
function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <img style={{height:"150px",width:"150px",marginTop:"12%"}} src="https://media.tenor.com/t5DMW5PI8mgAAAAi/loading-green-loading.gif" alt="Loading"/>;

  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="card">
    <img src={product.images[0]} alt={product.name} height="200" />
    <div className="content">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </div>
    <p className="price">Price: ${product.price}</p>
  </div>
  
  
  );
}


export default ProductDetails;
