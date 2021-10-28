import './App.css';
import {Container, Navbar, Nav, Row, Col, Table} from "react-bootstrap";
import CompanyInfo from './components/CompanyInfo';

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
        {/* <Row>
          <Col>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default App;
