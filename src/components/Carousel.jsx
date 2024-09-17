'use client';

import { useState, useEffect } from 'react';
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

export default function MyCarousel({ images }) {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateDimensions() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions(); // Set initial dimensions
    window.addEventListener('resize', updateDimensions); // Update dimensions on resize

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Conditionally render only when dimensions are available
  if (windowDimensions.width === 0 || windowDimensions.height === 0) {
    return null; // Or a loading spinner, placeholder, etc.
  }

  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={index} className="relative w-full h-full">
          <img
            src={image.src}
            alt={image.alt}
            className='h-full w-full object-cover max-h-screen max-w-screen'
          />
        </div>
      ))}
    </Carousel>
  );
}
