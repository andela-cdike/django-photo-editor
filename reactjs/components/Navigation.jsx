import React from 'react';
import { 
  ButtonGroup, DropdownButton, MenuItem,
  Nav, Navbar, NavItem, NavDropdown,
  OverlayTrigger, Tooltip
} from 'react-bootstrap';


export default class Navigation extends React.Component {
  render() {
    const tooltip = (
      <Tooltip id="tooltip"><strong>Sign out</strong></Tooltip>
    );

    return (
      <Navbar inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a class="brand-name" href="#">
              <img
                src={window.location.origin + "/static/photo_editor/img/logo.jpg"}
                id="logo"
              />
              &nbsp; PhotoMagick
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">{this.props.username}</NavItem>
            <OverlayTrigger placement="bottom" overlay={tooltip}>
              <NavItem eventKey={2} href={window.location.origin + "/logout/"}>
                <i class="fa fa-sign-out" aria-hidden="true"></i>
              </NavItem>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}