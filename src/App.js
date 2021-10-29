import './App.css';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteConfig } from "router/Router";
import SystemContextProvider from 'context/SystemContext';

function App() {
  return (
    <Router>
      <SystemContextProvider>
        <Header />
        <Container fluid>
          <RouteConfig />
        </Container>
      </SystemContextProvider>
    </Router>
  );
}

export default App;