import './App.css';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteConfig } from "router/Router";

function App() {
  return (
    <Router basename="/spacex-react">
      <Header />
      <Container fluid>
        <RouteConfig base />
      </Container>
    </Router>
  );
}

export default App;