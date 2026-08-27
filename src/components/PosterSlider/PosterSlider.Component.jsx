import React, { useRef } from "react";
import Slider from "react-slick";
import Poster from "../Poster/Poster.Component";
import SliderArrows from "../SliderArrows/SliderArrows.Component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PosterSlider = ({
  posters = [],
  title = "",
  subtitle = "",
  // Every screen in this app is on a dark navy background, so "light theme"
  // (black text) was never actually a valid default — it just made the
  // title/subtitle invisible wherever a caller forgot to pass isDark.
  isDark = true
}) => {
  const sliderRef = useRef(null);

  // Default settings with corrected 'infinite' spelling. Arrows/dots are
  // handled by our own SliderArrows instead of slick's defaults, which get
  // clipped by any ancestor with overflow-hidden and render as bare black dots.
  const settings = {
    infinite: false,
    autoplay: false,
    speed: 500,
    arrows: false,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Check if posters array is empty
  if (posters.length === 0) {
    return null; // or render a placeholder
  }

  return (
    <div className="poster-slider-container">
      <div className="flex flex-col items-start sm:ml-3 my-2">
        <h3
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>
        <p className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
          {subtitle}
        </p>
      </div>
      <div className="relative group">
        <Slider ref={sliderRef} {...settings}>
          {posters.map((each, index) => (
            <Poster
              key={each.id || index}
              {...each}
              isDark={isDark}
            />
          ))}
        </Slider>
        {posters.length > settings.slidesToShow && <SliderArrows sliderRef={sliderRef} />}
      </div>
    </div>
  );
};

export default PosterSlider;
