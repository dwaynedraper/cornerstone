'use client';

import { useState, useEffect } from 'react';
import { Carousel } from "@material-tailwind/react";

interface CarouselImage {
  src: string;
  alt: string;
}

interface MyCarouselProps {
  images: CarouselImage[];
}

export default function MyCarousel({ images }: MyCarouselProps) {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateDimensions() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (windowDimensions.width === 0 || windowDimensions.height === 0) {
    return null;
  }

  return (
    // @ts-expect-error Material Tailwind Carousel has overly strict prop types
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
