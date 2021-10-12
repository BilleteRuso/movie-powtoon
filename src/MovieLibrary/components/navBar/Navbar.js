import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`navbar ${show && "navbar-black"}`}>
      <img
        className="navbar-logo"
        src="https://res.cloudinary.com/powtoon-dev/image/upload/v1621586068/hp2021/header_images/VCP_logo-02.svg"
        alt="Powtoon Logo"
      />
      <span className="sort-by">Sort by:</span>
    </div>
  );
}

export default Navbar;
