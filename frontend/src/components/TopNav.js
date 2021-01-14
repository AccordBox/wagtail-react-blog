import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class TopNav extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-2">
        <Container>
          <Link to="/" className="navbar-brand">React Wagtail Demo</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link target='_blank' href={process.env.REACT_APP_STORYBOOK_NAV_LINK}>StoryBook</Nav.Link>
              <Nav.Link target='_blank' href={process.env.REACT_APP_API_WAGTAIL_NAV_LINK}>Wagtail Admin</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export { TopNav };
