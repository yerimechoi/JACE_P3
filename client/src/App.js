import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Tables from './pages/Tables';
import MenuDetail from './pages/MenuDetail';
import Admin from './pages/Admin';
import PendingOrders from './pages/PendingOrders';
import Receipt from './pages/Receipt';
import Closing from './pages/Closing';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/admin" 
                element={<Admin />} 
              />
              <Route 
                path="/success" 
                element={<Success />} 
              />
              <Route 
                path="/orderHistory" 
                element={<OrderHistory />} 
              />
              <Route 
                path="/products/:id" 
                element={<Detail />} 
              />
              <Route 
                path="/menuDetail/:id" 
                element={<MenuDetail />} 
              />
              <Route
                path="/contact"
                element={<Contact />}
              />
              <Route
                path="/tables/:tablesId"
                element={<Login />}
              />
              <Route
                path="/tableOrder"
                element={<Tables />}
              />
              <Route
                path="/pendingorders"
                element={<PendingOrders />}
              />
              <Route
                path="/receipt"
                element={<Receipt />}
              />
              <Route
                path="/closing"
                element={<Closing />}
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
