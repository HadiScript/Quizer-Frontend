import { useEffect, useState, useRef } from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from 'react'
import { useAuth } from "../../../../context/authContext";
import { Button } from "antd";

const Navbar1 = () => {
  const [auth] = useAuth()


  const [activeItem, setActiveItem] = useState("Home");

  const [navClass, setnavClass] = useState("");

  // navbar Scroll

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass("nav-sticky");
    } else {
      setnavClass("");
    }
  }

  // toggle

  const navMenuRef = useRef(null);

  const toggleNavMenu = () => {
    navMenuRef.current.classList.toggle("collapse");
  };

  return (
    <nav className="fixed-top container d-flex justify-content-between align-items-center border-bottom" style={{ height: "50px" }}>
      <h5>Quizlet</h5>
      <div className="d-none d-md-flex align-items-center gap-2" >

        <span>Home</span>
        <span>About</span>
        <span>Features</span>
        <span>Price</span>
        {auth?.token ? <Button className="myBtn"><Link to='/subscribe/'>Dashboard</Link></Button> : <Button className="myBtn"><Link to='/signin'>Login</Link></Button>}


        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar1;
