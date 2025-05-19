import './App.css';
import Home from "./Screens/Home";
import CreateAndManageProduct from "./Screens/CreateAndManageProduct";
import PriceOptimization from "./Screens/PriceOptimization";
import store from './Redux/Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import AdminPage from "./Screens/AdminPage";
import BuyerPage from "./Screens/BuyerPage";
import SupplierPage from "./Screens/SupplierPage";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manage-product" element={<CreateAndManageProduct />} />
            <Route path="/price-optimization" element={<PriceOptimization />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/buyer" element={<BuyerPage />} />
            <Route path="/supplier" element={<SupplierPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
