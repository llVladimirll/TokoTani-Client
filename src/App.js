import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import HomePage from './pages/page.jsx';
import ProductPage from './pages/product/page.jsx';
import RegisterPage from './pages/register/page.jsx';
import ProductDetailsPage from './pages/product/[id]/page.jsx';
import DashboardPage from './pages/dashboard/page.jsx';
import SellerNavbar from './components/navbar/SellerNavbar.jsx';
import Sidebar from './components/navbar/Sidebar.jsx';
import CartPage from './pages/cart/page.jsx';
import OrderPage from './pages/order/page.jsx';
import SellerPage from './pages/sellerRegister/page.jsx'
import ProfilePage from './pages/profile/page.jsx';
import AddProductPage from './pages/add-product/page.jsx';
import SellerProductPage from './pages/seller-product/page.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <div className='pages'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/product' element={<ProductPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<RegisterPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/product/:id' element={<ProductDetailsPage />} />
                <Route path='/cart' element={<CartPage/>} />
                <Route path='/seller/dashboard' element={<DashboardPage />} />
                <Route path='/seller/register' element={<SellerPage />} />
                <Route path='/seller/order' element={<OrderPage />} />
                <Route path='/seller/add-product' element={<AddProductPage />} />
                <Route path='/seller/product' element={<SellerProductPage />} />
              </Routes>
            </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
