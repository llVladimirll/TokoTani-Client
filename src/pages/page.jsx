import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar.jsx';
import backgroundImage from '../assets/elaine-casap-qgHGDbbSNm8-unsplash.jpg';
import fruitsImage from '../assets/josefin-s0fuB1h3yPw-unsplash.jpg';
import vegetablesImage from '../assets/sara-scarpa-AJFQGDaFP-s-unsplash.jpg';
import meatsImage from '../assets/kyle-mackie-MEnlQv-EQvY-unsplash.jpg';
import fishImage from '../assets/prince-charles-malaque-fSbr8cRDgAo-unsplash.jpg';

export default function HomePage() {
  return (
    <div>
    <Navbar />
      <div
        className="hero-header"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="header-O text-center text-white">
          <h1 style={{ color: '#ffffff' }}>
            Empowering Farmers Connecting Communities
          </h1>
          <p style={{ color: '#ffffff' }}>
            TokoTani is designed to support and uplift farmers by providing a
            platform for efficient and fair agricultural trade. Join us in
            transforming the agricultural landscape and empowering local farmers.
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{ display: 'flex', gap: '20px', marginTop: '20px' }}
      ></div>

      <section className="hero-section">
        <div className="card-grid">
          <Link className="card" to="/product?category=fruits">
            <div
              className="card__background"
              style={{ backgroundImage: `url(${fruitsImage})` }}
            ></div>
            <div className="card__content">
              <h3 className="card__heading">FRUIT</h3>
            </div>
          </Link>
          <Link className="card" to="/product?category=vegetables">
            <div
              className="card__background"
              style={{ backgroundImage: `url(${vegetablesImage})` }}
            ></div>
            <div className="card__content">
              <h3 className="card__heading">VEGETABLES</h3>
            </div>
          </Link>
          <Link className="card" to="/product?category=meats">
            <div
              className="card__background"
              style={{ backgroundImage: `url(${meatsImage})` }}
            ></div>
            <div className="card__content">
              <h3 className="card__heading">MEAT</h3>
            </div>
          </Link>
          <Link className="card" to="/product?category=fish">
            <div
              className="card__background"
              style={{ backgroundImage: `url(${fishImage})` }}
            ></div>
            <div className="card__content">
              <h3 className="card__heading">FISH</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
