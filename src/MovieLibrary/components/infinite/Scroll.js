import React, { useState, useEffect } from "react";
import axios from "../../request/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Scroll.css";

const BASE_URL = "https://image.tmdb.org/t/p/w300/";
const BACKUP_IMG =
  "https://www.cfpdudgvirtual.org/wp-content/uploads/2018/12/Powtoon.jpg";

function Scroll({ fetchUrl, handleModalChange, type }) {
  const [movies, setMovies] = useState([]);
  const [sortType, setSort] = useState("asc");
  const [page, setPage] = useState(4);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl + page);
      setMovies((prevMovies) => prevMovies.concat(request.data.results));
      sethasMore(request.data.page < request.data.total_pages);
      return request;
    }
    fetchData();
  }, [page]);

  useEffect(() => {
    function setSortType() {
      setSort(type);
    }
    setSortType();
  }, [type]);

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

  return (
    <section>
      <div className="scroll-content">
        <h2 className="scroll-title">And away we go</h2>
        <div className="scroll-container">
          <InfiniteScroll
            dataLength={movies.length}
            hasMore={hasMore}
            next={() => setPage((prevPage) => prevPage + 1)}
            loader="cargando..."
          >
            <div className="scroll-posters">
              {sorted.map((movie) => (
                <img
                  key={movie.id}
                  className="scroll-poster"
                  src={`${
                    movie.backdrop_path
                      ? BASE_URL + movie.backdrop_path
                      : BACKUP_IMG
                  }`}
                  alt={movie.original_title}
                  onClick={() => handleModalChange(movie)}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}

export default Scroll;
