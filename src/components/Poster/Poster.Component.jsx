import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiStar } from "react-icons/bi";

const Poster = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (props.onMovieSelect) {
      props.onMovieSelect(props.id);
      return;
    }
    window.location.href = `/movie/${props.id}`;
  };

  return (
    <motion.div
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-xl cursor-pointer shadow-lg shadow-black/30"
    >
      <div className="relative w-full aspect-[2/3] bg-navy-900">
        <motion.img
          src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
          alt={props.original_title || props.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/10 to-transparent" />

        {props.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-navy-900/80 text-yellow-500 text-xs font-medium px-2 py-1 rounded-full">
            <BiStar />
            {props.vote_average.toFixed(1)}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white text-sm sm:text-base font-semibold truncate">
            {props.original_title || props.title}
          </h3>
          {props.release_date && (
            <p className="text-gray-300 text-xs mt-0.5">{props.release_date.split("-")[0]}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Poster;
