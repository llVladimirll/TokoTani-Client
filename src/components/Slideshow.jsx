import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../assets/1.jpeg';
import image2 from '../assets/2.jpeg';
import image3 from '../assets/3.jpeg';
import image4 from '../assets/4.jpeg';
import image5 from '../assets/5.jpeg';

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const images = [image1, image2, image3, image4, image5];

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={5000}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block w-100" src={image} alt={`Slide ${idx + 1}`} style={{ backgroundPosition: 'top' }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slideshow;
