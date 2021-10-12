import React from "react";
import "./Loader.css";
import Logo from "./loading.png";

function Loader({ loaded }) {
  return (
    <div className="loader" style={{ opacity: loaded ? 0 : 1 }}>
      <img className="loader-img" src={Logo} alt="powtton-logo" />
      <img className="loader-img-2" src={Logo} alt="powtton-logo" />
    </div>
  );
}

export default Loader;
