import React from 'react';
import { 
  ButtonGroup, DropdownButton, MenuItem,
  Nav, Navbar, NavItem, NavDropdown
} from 'react-bootstrap';


export default class Navigation extends React.Component {
  render() {

    return (
      <Navbar inverse>
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
            <NavDropdown eventKey={2} 
              title={<i class="fa fa-sign-out" aria-hidden="true"></i>} 
              id="basic-nav-dropdown"
              class="profile-link"
            >
              <MenuItem eventKey={2.1} disabled>Erika</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={2.2} href={window.location.origin + "/logout/"}>
                Log out
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}