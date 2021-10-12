import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import TMDBImage from "./TMDBImage";

export default class MoviesList extends PureComponent {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    childToParent: PropTypes.func,
  };

  state = {
    selectedMovie: null,
  };

  handleSelectMovie = (item) => this.setState({ selectedMovie: item });

  render() {
    const { movies } = this.props;
    const { childToParent } = this.props;
    const { selectedMovie } = this.state;

    return (
      <div className="row">
        <h2 className="row-title">Now playing</h2>
        {/* <SortingOptions /> */}
        <div className="row-container">
          <div className="row-arrow left">
            {/* <img className="left-img" src={Arrow} /> */}
          </div>
          <div className="row-posters">
            {movies.map((movie) => (
              <MovieListItem
                key={movie.id}
                movie={movie}
                isSelected={selectedMovie === movie}
                onSelect={this.handleSelectMovie}
                childToParent={childToParent}
              />
            ))}
          </div>
        </div>
        <div className="row-arrow right">
          {/* <img className="right-img" src={Arrow} /> */}
        </div>
      </div>
    );
  }
}

class MovieListItem extends Component {
  handleClick = () => {
    const { movie, onSelect, childToParent } = this.props;
    onSelect(movie);
    childToParent(movie);
  };

  render() {
    const { movie, isSelected } = this.props;
    return (
      <div
        className={classNames("movie-list-item", { selected: isSelected })}
        onClick={this.handleClick}
      >
        <TMDBImage
          src={movie.poster_path}
          alt={movie.title}
          className="row-poster"
        />
      </div>
    );
  }
}
