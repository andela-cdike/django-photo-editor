import React from 'react';
import {
  Nav, Navbar, NavItem,
  OverlayTrigger, Tooltip,
} from 'react-bootstrap';


const Navigation = ({ username }) => {
  const tooltip = (
    <Tooltip id="tooltip"><strong>Sign out</strong></Tooltip>
  );

  return (
    <Navbar inverse fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <a className="brand-name" href={window.location.origin}>
            <img
              src={`${window.location.origin}/static/photo_editor/img/logo.jpg`}
              id="logo"
              role="presentation"
            />
            &nbsp; PhotoMagick
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav />
        <Nav pullRight>
          <NavItem eventKey={1} href="#">{username}</NavItem>
          <OverlayTrigger placement="bottom" overlay={tooltip}>
            <NavItem eventKey={2} href={`${window.location.origin}/logout/`}>
              <i className="fa fa-sign-out" aria-hidden="true" />
            </NavItem>
          </OverlayTrigger>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  username: React.PropTypes.string.isRequired,
};

export default Navigation;
