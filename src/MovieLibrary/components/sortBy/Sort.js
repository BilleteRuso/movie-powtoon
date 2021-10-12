import React, { Component } from "react";
import "./Sort.css";

class Sort extends Component {
  state = {
    value: "",
  };

  // handleChange = (e) => {
  //   const selectedValue = e.target.value;
  //   const { onChange } = this.props;
  //   this.setState({ value: selectedValue });
  //   onChange(selectedValue);
  // };

  render() {
    return (
      <select
        className="sort"
        // value={this.state.value}
        // onChange={this.handleChange}
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
