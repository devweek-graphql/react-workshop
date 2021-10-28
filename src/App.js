import './App.css';
import {Container, Navbar, Nav} from "react-bootstrap";
import CompanyInfo from './pages/CompanyInfo';
import RocketList from './pages/RocketList';
import LaunchList from './pages/LaunchList';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className={"py-3"}>
          <Navbar.Brand href="#home">SpaceX</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid>
        <CompanyInfo />
        <RocketList />
        <LaunchList />
      </Container>
    </>
  );
}

export default App;
