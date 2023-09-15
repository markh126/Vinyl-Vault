/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';

export default function NavBar() {
  return (
    <Navbar className="nav-bar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/users/collection">
              <Nav.Link>Collection</Nav.Link>
            </Link>
            <Link passHref href="/users/wishlist">
              <Nav.Link>Wishlist</Nav.Link>
            </Link>
            <Link passHref href="/users/borrowed">
              <Nav.Link>Borrowed</Nav.Link>
            </Link>
            <Link passHref href="/users/userList">
              <Nav.Link>Users</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
