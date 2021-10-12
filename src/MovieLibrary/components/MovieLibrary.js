import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTopRatedMovies } from "../store/actions";

import { getMovies } from "../store/selectors";
import MoviesList from "./MoviesList";
import Banner from "../components/banner/Banner";
import Modal from "../components/modal/Modal";

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
        {movies.length && <Banner movies={movies} />}
        {movies.length && (
          <MoviesList movies={movies} childToParent={this.childToParent} />
        )}
        {<Modal movie={this.state.movieModal} count={this.state.count} />}
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
