import React from 'react';
import {
  Col, ListGroup, ListGroupItem, Row
} from 'react-bootstrap';

export default class FinderToolBar extends React.Component {
  constructor() {
    super();
    this.state = {
      active: null,
    }
  }

  toggleFolderIcon(e) {
    const el_id = e.currentTarget.id;
    if (this.state.active === el_id){
      this.setState({ active: null })
    }
    else {
      this.setState({ active: e.currentTarget.id })
    }
  }

  render() {
    const folders = ['General', 'Holiday', 'Babies', 'Chilling', 'Food', 'Drama']
    const closedFolderIcon = <i class="fa fa-folder" aria-hidden="true"></i>;
    const openFolderIcon = <i class="fa fa-folder-open" aria-hidden="true"></i>;
    const mappedFolders = folders.map((folder, i) => 
      <ListGroupItem key={i} id={i} onClick={this.toggleFolderIcon.bind(this)}>
        {
          this.state.active == i
            ? openFolderIcon
            : closedFolderIcon
        }
        &nbsp;
        {folder}
      </ListGroupItem>
    );

    return (
      <div>
        <Row>
          <Col md={12}>FOLDERS</Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <ListGroup>
              {mappedFolders}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}
