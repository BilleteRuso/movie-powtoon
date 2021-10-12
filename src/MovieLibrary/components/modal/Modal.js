import React, { useState, useEffect } from "react";
import "./Modal.css";

const BASE_URL = "https://image.tmdb.org/t/p/w500/";
const BACKUP_IMG =
  "https://www.cfpdudgvirtual.org/wp-content/uploads/2018/12/Powtoon.jpg";

function Modal({ movie, count }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalContainerClick = (e) => e.stopPropagation();

  useEffect(() => {
    function openModal() {
      if (movie !== "") {
        setIsOpen(true);
      }
    }
    openModal();
  }, [count]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="expanded-movie-item">
      <article
        className={`modal ${isOpen && "is-open"}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="modal-container" onClick={handleModalContainerClick}>
          <button className="modal-close" onClick={() => setIsOpen(false)}>
            X
          </button>
          <img
            className="modal-poster"
            src={`${BASE_URL + movie.backdrop_path}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${BACKUP_IMG}`;
            }}
          />
          <div className="modal-content">
            <h2 className="modal-title">
              {movie.title || movie.original_title}
            </h2>
            {truncate(movie.overview, 70)}
            <h3 className="modal-rank">Ranked {movie.vote_average}</h3>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Modal;
