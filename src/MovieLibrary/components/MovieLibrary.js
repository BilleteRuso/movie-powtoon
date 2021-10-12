import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTopRatedMovies } from "../store/actions";

import { getMovies } from "../store/selectors";
import MoviesList from "./MoviesList";

class MovieLibrary extends Component {
  static propTypes = {};

  state = {
    movieModal: "",
    count: 0,
  };

  componentDidMount() {
    const { fetchTopRatedMovies } = this.props;
    fetchTopRatedMovies();
  }

  childToParent = (childData) => {
    this.setState({ movieModal: childData });
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { movies } = this.props;
    return (
      <div className="MovieLibrary">
        {movies.length && (
          <MoviesList movies={movies} childToParent={this.childToParent} />
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    movies: getMovies(state),
  }),
  { fetchTopRatedMovies }
)(MovieLibrary);
