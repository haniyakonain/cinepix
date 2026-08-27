import React, { useState } from "react";

// TMDB often has no profile photo for a cast member. The old version always
// rendered an <img> regardless, which — on failure — fell back to its
// hardcoded, non-descriptive alt text ("cast and crew") rendered as visible
// text right in the card. Show a themed initial-letter avatar instead.
const Cast = (props) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(props.image) && !imageFailed;

  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-navy-800 flex items-center justify-center flex-shrink-0">
        {showImage ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${props.image}`}
            alt={props.castName || "Cast member"}
            className="w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="text-3xl font-bold text-gray-400">
            {props.castName ? props.castName.charAt(0).toUpperCase() : "?"}
          </span>
        )}
      </div>
      <h1 className="text-white text-lg sm:text-xl mt-3 font-semibold truncate max-w-[140px]">
        {props.castName}
      </h1>
      <h5 className="text-gray-400 text-sm truncate max-w-[140px]">{props.role}</h5>
    </div>
  );
};

export default Cast;
