import './App.css';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteConfig } from "router/Router";

function App() {
  return (
    <Router>
      <Header />
      <Container fluid>
        <RouteConfig />
      </Container>
    </Router>
  );
}

export default App;