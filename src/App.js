import './App.css';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteConfig } from "router/Router";
import SystemContextProvider from 'context/SystemContext';

function App() {
  return (
    <Router basename="/spacex-react">
      <SystemContextProvider>
        <Header />
        <Container fluid>
          <RouteConfig base />
        </Container>
      </SystemContextProvider>
    </Router>
  );
}

export default App;