import './App.css';
import {Container, Navbar, Nav} from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteConfig } from "router/Router";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container className={"py-3"}>
            <Navbar.Brand href="/">SpaceX</Navbar.Brand>
            <Nav className="me-auto">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
              <Link to={"/rockets"} className="nav-link">
                Rockets
              </Link>
              <Link to={"/launchs"} className="nav-link">
                Launchs
              </Link>
            </Nav>
          </Container>
        </Navbar>
        <Container fluid>
          <RouteConfig />
        </Container>
      </Router>
    </>
  );
}

export default App;