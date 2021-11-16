import './App.css';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteConfig } from "router/Router";
import SystemContextProvider from 'context/SystemContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import APP_CONFIG from 'config/app.config';

const client = new ApolloClient({
  uri: APP_CONFIG.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router basename="/spacex-react">
      <ApolloProvider client={client}>
        <SystemContextProvider>
          <Header />
          <Container fluid>
            <RouteConfig base />
          </Container>
        </SystemContextProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;