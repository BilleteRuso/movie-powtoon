import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Sort.css";

class Sort extends Component {
  static propTypes = {
    handleSortingChange: PropTypes.func,
  };

  state = {
    value: "",
  };

  handleChange = (e) => {
    const selectedValue = e.target.value;
    const { handleSortingChange } = this.props;
    this.setState({ value: selectedValue });
    handleSortingChange(selectedValue);
  };

  render() {
    return (
      <select
        className="sort"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <option value=""></option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
        <option value="rank">Ranking</option>
      </select>
    );
  }
}

export default Sort;
