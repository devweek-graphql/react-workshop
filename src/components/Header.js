import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className={"py-3"}>
        <Navbar.Brand href="/">SpaceX</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to={"/"} className="nav-link" exact>
            Home
          </NavLink>
          <NavLink to={"/rockets"} className="nav-link">
            Rockets
          </NavLink>
          <NavLink to={"/launchs"} className="nav-link">
            Launchs
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;