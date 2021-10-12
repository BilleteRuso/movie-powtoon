import React, { useState, useEffect } from "react";
import axios from "../../request/axios";
import requests from "../../request/request";
import "./Banner.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";

function Banner({ handleLoad }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNowPlaying1);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }
    fetchData();
    setTimeout(function () {
      handleLoad(true);
    }, 1000);
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${BASE_URL}${movie?.backdrop_path} )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{movie?.title || movie?.original_name}</h1>
        <h2 className="banner-description">{truncate(movie?.overview, 170)}</h2>
        <h2 className="banner-rank">Ranked {movie?.vote_average}</h2>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
