import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Banner.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";
const BACKUP_IMG =
  "https://www.cfpdudgvirtual.org/wp-content/uploads/2018/12/Powtoon.jpg";

export default class Banner extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
  };

  state = {
    selectedMovie: null,
  };

  render() {
    const { movies } = this.props;
    const { selectedMovie } = this.state;

    return (
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${BASE_URL}${movies[1].backdrop_path})`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner-content">
          <h1 className="banner-title">
            {movies[1].title || movies[1].original_name}
          </h1>
          <h2 className="banner-description">{movies[1].overview}</h2>
          <h2 className="banner-rank">Ranked {movies[1].vote_average}</h2>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  }
}
