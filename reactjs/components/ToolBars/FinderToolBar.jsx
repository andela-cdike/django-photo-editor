import React from 'react';
import {
  Button, Col, ListGroup, ListGroupItem, Row
} from 'react-bootstrap';

import { changeActiveImage } from '../../actions/imageActions';

import AddNewFolder from '../FinderToolBar/AddNewFolder';
import ThumbnailView from './ThumbnailView';


export default class ThumbnailLink extends React.Component {
  render() {
    return (
      <a href={this.props.link}>
        <ThumbnailView
          tools={this.props.images}
          class="thumbnail-view"
          title=""
        />
      </a>
    );
  }
}


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

  handleAdd() {
    console.log("Hello");
  }

  render() {
    const { folders } = this.props.folders;
    console.log("FOLDERS: ", this.props.folders.folders)
    const closedFolderIcon = <i class="fa fa-folder" aria-hidden="true"></i>;
    const openFolderIcon = <i class="fa fa-folder-open" aria-hidden="true"></i>;

    const mappedFolders = folders.map((folder, i) =>
      <div key={folder.id} >
        <ListGroupItem id={folder.id} onClick={this.toggleFolderIcon.bind(this)}>
          {
            this.state.active == folder.id
              ? openFolderIcon
              : closedFolderIcon
          }
          &nbsp;
          {folder.name}
        </ListGroupItem>
        {
          this.state.active == folder.id
            ?  <ThumbnailView action={changeActiveImage} dispatch={this.props.dispatch} tools={folder.images} class="thumbnail-view" title="" />
            : null
        }
      </div>
    );

    return (
      <div>
        <Row>
          <Col md={10}>FOLDERS</Col>
            <AddNewFolder
              dispatch={this.props.dispatch}
            />
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
