import React, { useState, useEffect, useRef } from "react";
import axios from "../../request/axios";
import "./Row.css";
import Arrow from "./arrow.png";

const BASE_URL = "https://image.tmdb.org/t/p/w500/";
const BACKUP_IMG =
  "https://www.cfpdudgvirtual.org/wp-content/uploads/2018/12/Powtoon.jpg";

function Row({ title, fetchUrl, handleModalChange, type }) {
  const [movies, setMovies] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [sortType, setSort] = useState("");

  //API request
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  //Set type of sort
  useEffect(() => {
    function setSortType() {
      setSort(type);
    }
    setSortType();
  }, [type]);

  //Sort method
  const sorted = movies.sort(function (a, b) {
    if (sortType === "asc") {
      const isReversed = 1;
      return isReversed * a.title.localeCompare(b.title);
    } else if (sortType === "desc") {
      const isReversed = -1;
      return isReversed * a.title.localeCompare(b.title);
    } else if (sortType === "rank") {
      return b.vote_average - a.vote_average;
    }
  });

  //Horizontal Scroll
  const listRef = useRef();
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x;
    if (isActive && direction === "left" && slideNumber > 0) {
      setIsActive(false);
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${980 + distance}px)`;
    }
    if (isActive && direction === "right" && slideNumber < 3) {
      setIsActive(false);
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-980 + distance}px)`;
    }
    setTimeout(() => {
      setIsActive(true);
    }, 600);
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <div
          className="row-arrow left"
          onClick={() => handleClick("left")}
          style={{ visibility: isMoved && "visible" }}
        >
          <img className="left-img" src={Arrow} alt="left-arrow" />
        </div>
        <div className="row-posters" ref={listRef}>
          {sorted.map((movie) => (
            <img
              key={movie.id}
              className="row-poster"
              src={`${
                movie.poster_path ? BASE_URL + movie.poster_path : BACKUP_IMG
              }`}
              alt={movie.title}
              onClick={() => handleModalChange(movie)}
            />
          ))}
        </div>
      </div>
      <div className="row-arrow right" onClick={() => handleClick("right")}>
        <img className="right-img" src={Arrow} alt="rigth-arrow" />
      </div>
    </div>
  );
}

export default Row;
