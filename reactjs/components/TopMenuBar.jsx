import React from 'react';
import {
  Nav, NavItem
} from 'react-bootstrap';

import UploadImageButton from './TopMenuBar/UploadImageButton';


export default class TopMenuBar extends React.Component {
  constructor() {
    super();
    this.state = {
      saveIsActive: true,
      cancelIsActive: true,
      shareIsActive: true,
    };
  }

  handleSelect(selectedKey) {
    alert('selected ' + selectedKey);
  }

  render() {
    console.log('hello: ', this.props.folders)
    const { saveIsActive, cancelIsActive, shareIsActive } = this.state;

    return (
      <Nav
        bsStyle="pills"
        pullRight
        onSelect={this.handleSelect.bind(this)}
      >
        <UploadImageButton
          dispatch={this.props.dispatch}
          folders={this.props.folders}
          uploadImageErrorStatus={this.props.uploadImageErrorStatus}
        />
        <NavItem eventKey={2} title="Item" disabled={saveIsActive}>
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          &nbsp; Apply
        </NavItem>
        <NavItem eventKey={3} disabled={cancelIsActive}>
          <i class="fa fa-times" aria-hidden="true"></i>
          &nbsp; Undo
        </NavItem>
        <NavItem eventKey={4} disabled={shareIsActive}>
          <i class="fa fa-facebook-official" aria-hidden="true"></i>
          &nbsp; Share
        </NavItem>
      </Nav>
    );
  }
}