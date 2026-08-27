import React, { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BiPlay, BiX } from "react-icons/bi";

// A grid of this movie's trailers/teasers/clips (from the same /videos
// response Movie.Page already fetches) that open in an inline modal player
// instead of leaving the site.
const VideoGallery = ({ videos = [], movieTitle }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  if (videos.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {videos.map((video) => (
          <motion.button
            type="button"
            key={video.id || video.key}
            onClick={() => setActiveVideo(video)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-left bg-navy-800/60 rounded-lg overflow-hidden border border-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <div className="relative w-full aspect-video bg-navy-900">
              <img
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="bg-red-500/90 text-white rounded-full p-2 sm:p-3">
                  <BiPlay size={20} />
                </span>
              </div>
              {video.type && (
                <span className="absolute top-2 left-2 text-[10px] sm:text-xs bg-navy-900/80 text-gray-200 px-2 py-0.5 rounded-full">
                  {video.type}
                </span>
              )}
            </div>
            <p className="p-2 text-xs sm:text-sm text-white truncate">{video.name}</p>
          </motion.button>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-navy-900 rounded-xl border border-red-500/20 p-3 sm:p-4"
              >
                <button
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video"
                  className="absolute -top-3 -right-3 sm:top-2 sm:right-2 bg-navy-800 text-gray-200 hover:text-red-400 rounded-full p-1.5 transition-colors"
                >
                  <BiX size={22} />
                </button>
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideo.key}?autoplay=1`}
                    title={`${movieTitle} - ${activeVideo.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <p className="text-white text-sm sm:text-base mt-3 font-medium truncate">{activeVideo.name}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default VideoGallery;
