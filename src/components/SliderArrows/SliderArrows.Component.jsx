import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

// Plain buttons driving the slick ref directly (slickPrev/slickNext) instead
// of slick's own nextArrow/prevArrow props — those inherit slick-theme's
// default sizing/position, which gets clipped by any ancestor with
// overflow-hidden. Hidden on touch screens, where swipe already works.
const SliderArrows = ({ sliderRef }) => (
  <>
    <button
      type="button"
      onClick={() => sliderRef.current?.slickPrev()}
      aria-label="Previous"
      className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-navy-900/70 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500"
    >
      <BiChevronLeft size={20} />
    </button>
    <button
      type="button"
      onClick={() => sliderRef.current?.slickNext()}
      aria-label="Next"
      className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-navy-900/70 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500"
    >
      <BiChevronRight size={20} />
    </button>
  </>
);

export default SliderArrows;
