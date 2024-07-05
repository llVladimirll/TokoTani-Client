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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<RegisterPage />} />
            <Route path='/product/:id' element={<ProductDetailsPage />} />
            <Route path='/seller/dashboard' element={<DashboardPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
