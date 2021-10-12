import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import requests from "./MovieLibrary/request/request";

import Navbar from "./MovieLibrary/components/navBar/Navbar";
import Sort from "./MovieLibrary/components/sortBy/Sort";
import Banner from "./MovieLibrary/components/banner/Banner";
import Row from "./MovieLibrary/components/row/Row";
import Modal from "./MovieLibrary/components/modal/Modal";
import Footer from "./MovieLibrary/components/footer/Footer";
import Loader from "./MovieLibrary/components/loader/Loader";
import Infinite from "./MovieLibrary/components/infinite/Scroll";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

class App extends Component {
  state = {
    movieModal: "",
    count: 0,
    type: "",
    isLoad: false,
  };

  handleSortingChange = (sortType) => {
    this.setState({ type: sortType });
  };

  handleModalChange = (movieSelected) => {
    this.setState({ movieModal: movieSelected });
    this.setState({ count: this.state.count + 1 });
  };

  handleLoad = (loaded) => {
    this.setState({ isLoad: loaded });
  };

  render() {
    return (
      <Provider store={store}>
        <Loader loaded={this.state.isLoad} />
        <Sort handleSortingChange={this.handleSortingChange} />
        <Modal movie={this.state.movieModal} count={this.state.count} />
        <Navbar />
        <Banner handleLoad={this.handleLoad} />
        <Row
          title="Now Playing"
          fetchUrl={requests.fetchNowPlaying1}
          handleModalChange={this.handleModalChange}
          type={this.state.type}
        />
        <Row
          fetchUrl={requests.fetchNowPlaying2}
          handleModalChange={this.handleModalChange}
          type={this.state.type}
        />
        <Row
          fetchUrl={requests.fetchNowPlaying3}
          handleModalChange={this.handleModalChange}
          type={this.state.type}
        />
        <Infinite
          fetchUrl={requests.fetchScroll}
          handleModalChange={this.handleModalChange}
          type={this.state.type}
        />
        <Footer />
      </Provider>
    );
  }
}

export default App;
