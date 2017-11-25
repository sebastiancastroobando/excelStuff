import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Navigation extends React.Component {
    render() {
        return (
          <Navbar className="navbar-inverse navbar-default navbar-static-top" collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                  <LinkContainer to="/Home">
                    <a>Match Maker</a>
                  </LinkContainer>
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                  <LinkContainer to="/updateInfo">
                    <NavItem eventKey={1}>Update Information</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/findMatch">
                    <NavItem eventKey={2}>Find Match</NavItem>
                  </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}
