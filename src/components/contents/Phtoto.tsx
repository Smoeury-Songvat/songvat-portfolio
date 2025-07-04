import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { images } from "@/lib/consts";

interface PhotoProps {
  theme: string;
}

const Photo = ({ theme }: PhotoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const imagesPerView = 3;
  const maxIndex = Math.max(0, images.length - imagesPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Mouse wheel scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (e.deltaY > 0) {
      // Scrolling down - go to next slide
      nextSlide();
    } else {
      // Scrolling up - go to previous slide
      prevSlide();
    }
  };

  useEffect(() => {
    if (isAutoPlaying && images.length > imagesPerView) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= maxIndex) {
            return 0;
          }
          return prevIndex + 1;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, maxIndex, images.length]);

  const isDark = theme === "primary";

  return (
    <div
      className={`w-full max-w-4xl mx-auto mt-6 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } rounded-xl`}
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onWheel={handleWheel}
      >
        {/* Gallery container */}
        <div
          className="flex transition-transform duration-700 ease-out gap-4"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / imagesPerView + 4 / 3)
            }%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative group"
              style={{
                width: `calc(${100 / imagesPerView}% - ${
                  (16 * (imagesPerView - 1)) / imagesPerView
                }px)`,
              }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                <Image
                  width={400}
                  height={600}
                  src={image.url}
                  alt={""}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                {/* Title overlay */}
                {/* <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold text-center">{image.title}</h3>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows - only show if there are more images than visible */}
        {images.length > imagesPerView && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 ${
                currentIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg"
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 ${
                currentIndex >= maxIndex
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg"
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Progress indicators */}
        {images.length > imagesPerView && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Photo };
