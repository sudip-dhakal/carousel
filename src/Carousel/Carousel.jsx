import React, { useEffect, useRef, useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselBoxRef = useRef();
  const intervalRef = useRef(0);

  const getCrousalContent = () => {
    const carouselBox = carouselBoxRef.current;
    const slides = carouselBox.children;
    const count = slides.length;
    return { slides, count };
  };

  const startSlider = () => {
    const { slides, count } = getCrousalContent();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev === count - 1 ? 0 : prev + 1;

        [...slides].forEach((slide, index) => {
          slide.setAttribute("data-active", index === newIndex);
        });

        return newIndex;
      });
    }, 3000);
  };

  useEffect(() => {
    const { slides, count } = getCrousalContent();
    slides[0].setAttribute("data-active", "true");
    startSlider();
  }, []);

  const handleNext = () => {
    clearInterval(intervalRef.current);
    const { count, slides } = getCrousalContent();
    const newIndex = currentIndex === count - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    [...slides].forEach((slide, index) => {
      slide.setAttribute("data-active", index === newIndex);
    });
    startSlider();
  };

  const handlePrevious = () => {
    const { count, slides } = getCrousalContent();
    const newIndex = currentIndex === 0 ? count - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    [...slides].forEach((slide, index) => {
      slide.setAttribute("data-active", index === newIndex);
    });
  };

  const handleButtonClick = (newIndex) => {
    clearInterval(intervalRef.current);
    const { slides } = getCrousalContent();
    setCurrentIndex(newIndex);
    [...slides].forEach((slide, index) => {
      slide.setAttribute("data-active", index === newIndex);
    });
    startSlider();
  };

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    startSlider();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-fit bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6 py-10">
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-white font-extrabold text-2xl mb-2 tracking-wide">
              Slide {currentIndex + 1}
            </h1>
            <p className="text-gray-400 text-sm max-w-md mx-auto md:mx-0">
              Use the navigation buttons to browse through the carousel.
            </p>
          </div>

          <div className="flex space-x-6">
            <button
              className="bg-red-600 hover:bg-red-700 active:scale-95 transition transform w-14 h-14 rounded-full flex justify-center items-center shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handlePrevious}
            >
              <GrPrevious color="white" size={26} />
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 active:scale-95 transition transform w-14 h-14 rounded-full flex justify-center items-center shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleNext}
            >
              <GrNext color="white" size={26} />
            </button>
          </div>
        </div>

        <div
          ref={carouselBoxRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-[90vw] max-w-4xl h-[55vh] md:h-[60vh] overflow-hidden rounded-2xl shadow-2xl border border-gray-700 bg-gray-950 p-2 mb-6"
        >
          {children}
        </div>

        <div className="flex gap-x-5 items-center justify-center">
          {[...children].map((child, index) => {
            return (
              <button
                className="bg-red-700 cursor-pointer text-white transition hover:bg-blue-700 hover:scale-150 duration-300 w-[2rem] h-[2rem] rounded-full"
                onClick={() => handleButtonClick(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Carousel;
