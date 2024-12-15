import React, { useState } from "react";
import { motion } from "framer-motion";

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
      initial={{ 
        opacity: 0, 
        scale: 0.9,
        boxShadow: "0 0 0px 0px rgba(0,255,255,0)"
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        boxShadow: isHovered 
          ? "0 0 20px 5px rgba(0,255,255,0.5)" 
          : "0 0 0px 0px rgba(0,255,255,0)"
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }}
      className="relative overflow-hidden rounded-2xl border-2 border-transparent"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
          alt={props.original_title}
          className="w-full h-full object-cover transition-transform duration-300"
          initial={{ 
            scale: 1,
            filter: "brightness(70%)"
          }}
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            filter: isHovered 
              ? "brightness(50%) saturate(150%) hue-rotate(30deg)" 
              : "brightness(70%)"
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-red-900/70 via-blue-900/50 to-green-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0.7, 
            y: isHovered ? 0 : 20,
            backgroundColor: isHovered 
              ? "rgba(0,255,255,0.3)" 
              : "rgba(0,0,0,0.5)"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3 
            className="text-neon-green text-xl font-bold truncate drop-shadow-[0_0_5px_rgba(0,255,0,0.7)]"
            initial={{ 
              y: 10, 
              opacity: 0,
              color: "rgba(0,255,0,0.5)"
            }}
            animate={{ 
              y: isHovered ? 0 : 10, 
              opacity: isHovered ? 1 : 0.7,
              color: isHovered 
                ? "rgba(0,255,0,1)" 
                : "rgba(0,255,0,0.7)",
              textShadow: isHovered 
                ? "0 0 10px rgba(0,255,0,0.7)" 
                : "0 0 0px rgba(0,255,0,0)"
            }}
            transition={{ duration: 0.3 }}
          >
            {props.original_title}
          </motion.h3>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Poster;