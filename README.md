# 🎬 CinePix: Your Ultimate Movie Experience 🍿

Welcome to **CinePix**, your premier destination for all things cinema! 🌟  
CinePix brings you the **latest movie releases**, seamless **ticket booking**, exclusive **movie premieres**, and the best **trailers**. Enjoy browsing movies, reading real user reviews, and watching HD trailers all in one place.

## Why CinePix? 🤔

CinePix stands out with a vibrant color scheme of **red, green, and blue**, symbolizing **Cinema (Cine)** and **Pixels (Pix)**. These colors represent the art of filmmaking and the digital magic that brings films to life on screen. ✨

> These colors pay homage to the magic of cinema and digital imagery. 🎥

**Important Note:**  
Due to restrictions on accessing movie data in certain regions, we recommend using a **VPN** for the full CinePix experience. The Movie Database (TMDb) API, which powers many features, may not work properly in some regions, such as **India**. 🌍

## Features ✨

- **🎬 Latest Movie Releases**: Browse the latest **Hollywood**, **Bollywood**, and **Regional** movie releases.
- **🎟️ Instant Ticket Booking**: Book your tickets easily with **seat selection**.
- **🌟 Real User Reviews & Ratings**: Read reviews and ratings from fellow moviegoers.
- **🕒 Live Showtimes**: Check **real-time movie showtimes** and availability.

## Installation 🚀

To get started with CinePix on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:haniyakonain/cinepix.git
   ```
2. **Navigate into the project directory:**
   ```bash
   cd cinepix
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables**  
   Create a `.env` file in the root directory with your API keys:
   ```bash
   REACT_APP_TMDB_TOKEN=your_tmdb_api_key
   ```
5. **Run the development server:**
   ```bash
   npm start
   ```
   Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Project Structure 📂

```
CinePix/
├── node_modules 
├── public/
│   ├── cinepix.png
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── components/
│   │   ├── Booking/  
│   │   ├── Cast/
│   │   ├── Entertainment/
│   │   ├── Footer/
│   │   ├── HeroCarousel/
│   │   ├── HeroSection/
│   │   ├── Loader/
│   │   ├── MovieHero/
│   │   ├── Navbar/
│   │   ├── PaymentModel/
│   │   ├── Poster/
│   │   ├── PosterSlider/
│   │   ├── Reviews/
│   │   ├── ShowTimes/
│   ├── config/
│   ├── context/
│   ├── index.css
│   ├── index.js
│   ├── layout/
│   ├── pages/
│   └── services/
├── package.json
└── tailwind.config.js
```

## Usage 🎥

Once the app is running, you can explore the following features:

- **🏠 Home Page**: View featured movies and their details.
- **🎬 Movie Page**: Access detailed information about specific movies, including cast, trailers, reviews, and showtimes.
- **⏰ Showtimes**: Get real-time theatre showtimes and trailers.
- **🎟️ Book Tickets**: View the latest movies in theatres and book your tickets.
- **📝 Reviews**: Read and write reviews for movies you’ve watched.

## Technologies Used ⚙️

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making requests to APIs.
- **TMDb API**: External API for fetching movie data, including movie information, showtimes, trailers, and reviews.

---

Made with ❤️ by **Haniya Konain and team**.

