import React, { useEffect, useState } from "react";
import MovieLayoutHoc from "../layout/Movie.layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { FaCcVisa, FaCcApplePay } from "react-icons/fa";
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
import MovieHero from "../components/MovieHero/MovieHero.Component";
import Cast from "../components/Cast/Cast.Component";
import VideoGallery from "../components/Trailers/VideoGallery.Component";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer.Component";

const VIDEO_TYPE_PRIORITY = ["Trailer", "Teaser", "Clip", "Featurette"];

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

  const settings = {
    arrows: true,
    slidesToShow: 3,
    infinite: true,
    dots: true,
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
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieHero movie={movieData.movie} />
          <div className="my-12 container mx-auto px-4">
            <div className="flex flex-col items-start gap-3">
              <h1 className="text-white-800 font-bold text-2xl">About the movie</h1>
              <p>{movieData.movie.overview}</p>
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
              <Slider {...settingsCast}>
                {movieData.cast.map((castData) => (
                  <Cast
                    key={castData.id}
                    image={castData.profile_path}
                    castName={castData.original_name}
                    role={castData.character}
                  />
                ))}
              </Slider>
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
