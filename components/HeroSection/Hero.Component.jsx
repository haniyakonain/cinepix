import React, { useState, useEffect } from "react";
import HeroSlider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrows.Component";

const HeroCarousel = () => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch data from TMDB API
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const apiKey = process.env.REACT_APP_TMDB_TOKEN;
				if (!apiKey) {
					throw new Error("API key is missing. Please check your .env file.");
				}

				const response = await fetch(
					`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
				);
				console.log("Fetching from API:", response.url);

				if (!response.ok) {
					throw new Error(`Failed to fetch movies. Status: ${response.status}`);
				}

				const data = await response.json();
				console.log("Fetched data:", data);

				setImages(data.results || []);
			} catch (err) {
				console.error("Error fetching movies:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	// Carousel settings
	const settings = {
		arrows: true,
		slidesToShow: 3,
		infinite: true,
		dots: true,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 3000,
		cssEase: "ease-in-out",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	// Render slider with conditional class and height
	const renderSlider = (className, imageHeight) => (
		<div className={className}>
			<HeroSlider {...settings}>
				{images.map((image, index) => (
					<div className={`w-full ${imageHeight} py-3`} key={index}>
						<img
							src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`}
							alt={image.title || "Hero Banner"}
							className='w-full h-full rounded-md object-cover'
						/>
					</div>
				))}
			</HeroSlider>
		</div>
	);

	// Render loading, error, or slider
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='mt-16'>
			{/* Mobile Slider */}
			{renderSlider("mt-20 lg:hidden", "h-56 md:h-80")}

			{/* Desktop Slider */}
			{renderSlider("hidden lg:block mt-20", "h-96 px-2")}
		</div>
	);
};

export default HeroCarousel;
