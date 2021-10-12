import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import Navbar from "./MovieLibrary/components/navBar/Navbar";
import MovieLibrary from "./MovieLibrary";
import Footer from "./MovieLibrary/components/footer/Footer";
import SortBy from "./MovieLibrary/components/sortBy/SortBy";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar />
        <SortBy />
        <MovieLibrary />
        <Footer />
      </Provider>
    );
  }
}

export default App;
