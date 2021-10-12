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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

class App extends Component {
  state = {
    movieModal: "",
    count: 0,
  };

  childToParent = (childData) => {
    this.setState({ movieModal: childData });
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <Provider store={store}>
        <Navbar />
        <Banner />
        <Sort />
        <Row
          title="Now Playing"
          fetchUrl={requests.fetchNowPlaying1}
          childToParent={this.childToParent}
        />
        <Row
          fetchUrl={requests.fetchNowPlaying2}
          childToParent={this.childToParent}
        />
        <Row
          fetchUrl={requests.fetchNowPlaying3}
          childToParent={this.childToParent}
        />
        <Modal movie={this.state.movieModal} count={this.state.count} />
        <Footer />
      </Provider>
    );
  }
}

export default App;
