import React from 'react';
import {
  Nav, NavItem
} from 'react-bootstrap';


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
    const { saveIsActive, cancelIsActive, shareIsActive } = this.state;
    console.log(saveIsActive)
    return (
      <Nav
        bsStyle="pills"
        pullRight
        onSelect={this.handleSelect.bind(this)}
      >
        <NavItem eventKey={1} href="/home">
          <i class="fa fa-upload" aria-hidden="true"></i>
          &nbsp; Upload Image
        </NavItem>
        <NavItem eventKey={2} title="Item" disabled={saveIsActive}>
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          &nbsp; Save
        </NavItem>
        <NavItem eventKey={3} disabled={cancelIsActive}>
          <i class="fa fa-times" aria-hidden="true"></i>
          &nbsp; Cancel
        </NavItem>
        <NavItem eventKey={4} disabled={shareIsActive}>
          <i class="fa fa-share-alt" aria-hidden="true"></i>
          &nbsp; Share on FaceBook
        </NavItem>
      </Nav>
    );
  }
}