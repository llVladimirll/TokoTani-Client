import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar.jsx';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';

const ITEMS_PER_PAGE = 12;
const INITIAL_PAGE = 1;

function ProductPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const category = params.get('category') || '';
    fetchProducts(currentPage, search, category);
  }, [location.search, currentPage]);

  async function fetchProducts(page, search, category) {
    setLoading(true);
    try {
      let fetchUrl = `https://toko-tani-server-2.vercel.app/api/products/?page=${page}&limit=${ITEMS_PER_PAGE}`;
      if (search) {
        fetchUrl += `&search=${encodeURIComponent(search)}`;
      }
      if (category) {
        fetchUrl += `&category=${encodeURIComponent(category)}`;
      }
      const response = await axios.get(fetchUrl);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error state or show error message to user
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <Navbar/>
      <div className="container-fluid fruite py-5" style={{ marginTop: "30px" }}>
        <div className="container py-5">
          <div className="row g-4">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center w-100 vh-100 position-fixed top-0 start-0 bg-white">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              products.map(product => (
                <div key={product.id} className="col-lg-3">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}

export default ProductPage;
