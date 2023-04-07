import { Routes, Route} from 'react-router-dom';
import ProductDetails from './ProductDetails';
import ProductList from './Product';
function AllRoutes() {
  return (
    <Routes>
        <Route  path="/" element={<ProductList/>} />
        <Route  path="/products/:id" element={<ProductDetails/>} />
    </Routes>
  );
}

export default AllRoutes;
