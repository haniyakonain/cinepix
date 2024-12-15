import React, { useState, useEffect } from "react";
import HeroSlider from "react-slick";

const HeroCarousel = () => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

				if (!response.ok) {
					throw new Error(`Failed to fetch movies. Status: ${response.status}`);
				}

				const data = await response.json();
				setImages(data.results || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	const settings = {
		arrows: true, // Default arrow behavior from react-slick
		slidesToShow: 3,
		infinite: true,
		dots: true,
		slidesToScroll: 1,
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
						<p className='text-center text-white mt-2'>{image.title || "Untitled"}</p>
					</div>
				))}
			</HeroSlider>
		</div>
	);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='mt-24'>
			{" "}
			{/* Adjusted the margin-top to push below the navbar */}
			{renderSlider("mt-20 lg:hidden", "h-56 md:h-80")}
			{renderSlider("hidden lg:block mt-20", "h-96 px-2")}
		</div>
	);
};

export default HeroCarousel;
