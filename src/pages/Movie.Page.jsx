import React, { useEffect, useState, useRef } from "react";
import MovieLayoutHoc from "../layout/Movie.layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { FaCcVisa, FaCcApplePay } from "react-icons/fa";
import { BiCalendar, BiTime, BiCategory, BiGlobe, BiBuilding, BiDollarCircle, BiStar } from "react-icons/bi";
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
import MovieHero from "../components/MovieHero/MovieHero.Component";
import Cast from "../components/Cast/Cast.Component";
import VideoGallery from "../components/Trailers/VideoGallery.Component";
import SliderArrows from "../components/SliderArrows/SliderArrows.Component";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer.Component";

const VIDEO_TYPE_PRIORITY = ["Trailer", "Teaser", "Clip", "Featurette"];

const formatMoney = (value) => {
  if (!value) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

const languageName = (code) => {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code);
  } catch {
    return code.toUpperCase();
  }
};

const DetailItem = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2">
      <Icon className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
      <div className="min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-white break-words">{value}</p>
      </div>
    </div>
  );
};

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    cast: [],
    similarMovies: [],
    recommendedMovies: [],
    videos: [],
    movie: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch movie details, cast, similar, recommended movies and videos in parallel
        const [
          castResponse,
          similarResponse,
          recommendedResponse,
          movieResponse,
          videosResponse,
        ] = await Promise.all([
          axios.get(`/movie/${id}/credits`),
          axios.get(`/movie/${id}/similar`),
          axios.get(`/movie/${id}/recommendations`),
          axios.get(`/movie/${id}`),
          axios.get(`/movie/${id}/videos`),
        ]);

        const videos = videosResponse.data.results
          .filter((video) => video.site === "YouTube" && VIDEO_TYPE_PRIORITY.includes(video.type))
          .sort((a, b) => VIDEO_TYPE_PRIORITY.indexOf(a.type) - VIDEO_TYPE_PRIORITY.indexOf(b.type))
          .slice(0, 5);

        // Save the fetched data into the state
        setMovieData({
          cast: castResponse.data.cast,
          similarMovies: similarResponse.data.results,
          recommendedMovies: recommendedResponse.data.results,
          videos,
          movie: movieResponse.data,
        });

        // Simulate a minimum loading duration of 2 seconds
        setTimeout(() => setIsLoading(false), 100);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    // Fetch the data when the component is mounted
    fetchData();

    // Scroll to top when id changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleMovieClick = () => {
    navigate(`/movie/${id}`);
  };

  const castSliderRef = useRef(null);

  const settings = {
    arrows: false,
    slidesToShow: 3,
    infinite: true,
    dots: false,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  const settingsCast = {
    ...settings,
    // Infinite looping needs comfortably more real slides than slidesToShow
    // to clone from cleanly; with a short cast list it produces duplicated,
    // gapped cards instead. Not worth the risk for a cast list.
    infinite: false,
    // A cast list is something people read, not a slideshow — autoplay was
    // yanking it out from under you every 2s, and slick's slow (2000ms)
    // transition speed made each auto-advance a visible smear.
    autoplay: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const movie = movieData.movie;
  const genresText = movie.genres?.map((g) => g.name).join(", ");
  const releaseDateText = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const ratingText = movie.vote_average
    ? `${movie.vote_average.toFixed(1)}/10${
        movie.vote_count ? ` (${movie.vote_count.toLocaleString()} votes)` : ""
      }`
    : null;
  const studiosText = movie.production_companies
    ?.map((c) => c.name)
    .filter(Boolean)
    .join(", ");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieHero movie={movieData.movie} />
          <div className="my-12 container mx-auto px-4">
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-white-800 font-bold text-2xl">About the movie</h1>
              {movie.tagline && (
                <p className="text-gray-400 italic">"{movie.tagline}"</p>
              )}
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-2 w-full">
                <DetailItem icon={BiCalendar} label="Release Date" value={releaseDateText} />
                <DetailItem icon={BiTime} label="Runtime" value={movie.runtime ? `${movie.runtime} min` : null} />
                <DetailItem icon={BiCategory} label="Genres" value={genresText} />
                <DetailItem icon={BiGlobe} label="Language" value={languageName(movie.original_language)} />
                <DetailItem icon={BiStar} label="Rating" value={ratingText} />
                <DetailItem icon={BiBuilding} label="Studio" value={studiosText} />
                <DetailItem icon={BiDollarCircle} label="Budget" value={formatMoney(movie.budget)} />
                <DetailItem icon={BiDollarCircle} label="Box Office" value={formatMoney(movie.revenue)} />
              </div>
            </div>

            <div className="my-8">
              <hr />
            </div>

            <div className="my-8">
              <h2 className="text-white-800 font-bold text-2xl mb-3">Applicable Offers</h2>
              <div className="flex flex-col gap-3 lg:flex-row">
                {/* Visa and Apple Pay Offers */}
                <div className="offer-card">
                  <FaCcVisa />
                  <h3>Visa Stream Offer</h3>
                  <p>Get 50% off up to INR 150 on all RuPay cards.</p>
                </div>
                <div className="offer-card">
                  <FaCcApplePay />
                  <h3>Film Pass</h3>
                  <p>Get 50% off on BookMyShow Stream with RuPay cards.</p>
                </div>
              </div>
            </div>

            <div className="my-8">
              <hr />
            </div>

            {/* Cast & Crew */}
            <div className="my-8">
              <h2 className="text-white-800 font-bold text-2xl mb-4">Cast and Crew</h2>
              <div className="relative group">
                <Slider ref={castSliderRef} {...settingsCast}>
                  {movieData.cast.map((castData) => (
                    <Cast
                      key={castData.id}
                      image={castData.profile_path}
                      castName={castData.original_name}
                      role={castData.character}
                    />
                  ))}
                </Slider>
                {movieData.cast.length > settingsCast.slidesToShow && (
                  <SliderArrows sliderRef={castSliderRef} />
                )}
              </div>
            </div>

            <div className="my-8">
              <hr />
            </div>

            {/* Trailers & Videos */}
            {movieData.videos.length > 0 && (
              <>
                <div className="my-8">
                  <h2 className="text-white-800 font-bold text-2xl mb-4">Trailers &amp; Videos</h2>
                  <VideoGallery videos={movieData.videos} movieTitle={movieData.movie.original_title} />
                </div>

                <div className="my-8">
                  <hr />
                </div>
              </>
            )}

            {/* Recommended Movies */}
            <div className="my-8">
              <PosterSlider
                config={settings}
                title="Recommended Movies"
                posters={movieData.recommendedMovies}
                onMovieClick={handleMovieClick}
              />
            </div>

            <div className="my-8">
              <hr />
            </div>

            {/* Similar Movies */}
            <div className="my-8">
              <PosterSlider
                config={settings}
                title="Similar Movies"
                posters={movieData.similarMovies}
                onMovieClick={handleMovieClick}
              />
            </div>

            <div className="my-8">
              <hr />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default MovieLayoutHoc(MoviePage);
