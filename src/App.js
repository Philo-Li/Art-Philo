/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import Home from './components/Home';
import Discover from './components/Discover';
import Footer from './components/Footer';
import Profile from './components/Profile';
import UserLikes from './components/UserLikes';
import UserCollections from './components/UserCollections';
import PhotoDetails from './components/PhotoDetails';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import useAuthorizedUser from './hooks/useAuthorizedUser';
import useField from './hooks/useField';
import SearchBar from './components/SearchBar';
import logo from './logo.png';

const App = () => {
  const client = useApolloClient();
  const { authorizedUser } = useAuthorizedUser();
  const searchValue = useField('searchValue');
  const [newSearchValue, setNewSearchValue] = useState('');

  const Menu = () => {
    const handleLogout = async (event) => {
      event.preventDefault();
      localStorage.clear();
      client.resetStore();
    };

    let userPage;
    if (authorizedUser) userPage = `${authorizedUser.id}`;

    return (
      <div>
        <Navbar expand="lg" bg="dark" variant="dark" fixed="sticky">
          <Navbar.Brand className="text-light" href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Free Stock Photos"
            />
            Picky
          </Navbar.Brand>
          <SearchBar
            searchValue={searchValue}
            setNewSearchValue={setNewSearchValue}
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end light">
            <Nav className="justify-content-end">
              <Nav.Link className="text-light" href="/discover">Discover</Nav.Link>
              <Nav.Link className="text-light" href="/license">License</Nav.Link>
              {authorizedUser && <Nav.Link className="text-light" href={userPage}>Profile</Nav.Link>}
              <Nav.Link className="text-light" href="/signin">Login</Nav.Link>
              <Nav.Link className="text-light" href="/signup">Sign Up</Nav.Link>
              <Nav.Link className="text-light" href="/faq">FAQ</Nav.Link>
              {authorizedUser && <Button variant="outline-primary" type="submit" onClick={handleLogout}>logout</Button>}
            </Nav>
            <Nav>
              {!authorizedUser && <Button href="/join" variant="primary" type="submit">Join</Button>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <Menu />
        <div>
          <Switch>
            <Route path="/discover" exact>
              <Discover />
            </Route>
            <Route path="/license" exact>
              <Home />
            </Route>
            <Route path="/:id" exact>
              <Profile />
              <UserLikes />
            </Route>
            <Route path="/:id/collections" exact>
              <Profile />
              <UserCollections />
            </Route>
            <Route path="photo/:id" exact>
              <PhotoDetails />
            </Route>
            <Route path="/signin" exact>
              <SignInForm />
            </Route>
            <Route path="/signup" exact>
              <SignUpForm />
            </Route>
            <Route path="/FAQ" exact>
              <SignInForm />
            </Route>
            <Route path="/join" exact>
              <SignUpForm />
            </Route>
            <Route path="/" exact>
              <Home
                searchValue={searchValue}
                newSearchValue={newSearchValue}
                setNewSearchValue={setNewSearchValue}
              />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
