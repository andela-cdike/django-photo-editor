import React from 'react';
import {
  Button, Col, ListGroup, ListGroupItem, Row
} from 'react-bootstrap';

import { changeActiveImage } from '../../actions/imageActions';
import { deleteFolder, renameFolder } from '../../actions/folderActions';

import AddNewFolder from '../FinderToolBar/AddNewFolder';
import DeleteModal from '../DeleteModal';
import RenameModal from '../RenameModal';
import ThumbnailView from './ThumbnailView';


export default class FinderToolBar extends React.Component {
  constructor() {
    super();
    this.state = {
      activeFolderId: null,
      activeFolderName: null,
      showEditDeleteBtns: false,
      showDeleteModal: false,
      showRenameModal: false,
    }
  }

  toggleFolderIcon(e) {
    const el_id = e.currentTarget.id;
    if (this.state.activeFolderId === el_id){
      this.setState({ activeFolderId: null })
    }
    else {
      this.setState({ activeFolderId: e.currentTarget.id })
    }
  }

  handleAdd() {
    console.log("Hello");
  }

  onChildChanged(childKey, state) {
    this.setState({ [childKey]: state });
  }

  open(e) {
    e.preventDefault()
    const key = e.currentTarget.name;
    const element = e.currentTarget.parentNode.parentNode;
    const folderId = element.getAttribute('id');
    const folderName = element.getAttribute('data')
    this.setState({ 
      [key]: true,
      activeFolderId: Number(folderId),
      activeFolderName: folderName
    });
  }

  render() {
    const { folders } = this.props.folders;
    console.log('RENAME: ', this.state.showRenameModal)
    console.log("FOLDERS: ", this.props.folders.folders)
    const closedFolderIcon = <i class="fa fa-folder" aria-hidden="true"></i>;
    const openFolderIcon = <i class="fa fa-folder-open" aria-hidden="true"></i>;
    const deleteEditBtns = (
      <span>
        <a href="#" name="showDeleteModal" onClick={this.open.bind(this)}>
          <i class="fa fa-ban" aria-hidden="true" show={true}></i>
        </a>
        &nbsp;
        <a href="#" name="showRenameModal" onClick={this.open.bind(this)}>
          <i class="fa fa-pencil" aria-hidden="true" show={false}></i>
        </a>
      </span>
    );

    const mappedFolders = folders.map((folder, i) =>
      <Row key={folder.id} class="folder-list-item">
        <Col md={9}>
          <ListGroupItem
            id={folder.id}
            onClick={this.toggleFolderIcon.bind(this)}
          >
            {
              this.state.activeFolderId == folder.id
                ? openFolderIcon
                : closedFolderIcon
            }
            &nbsp;
            {folder.name}
          </ListGroupItem>
        </Col>
        <Col md={3} id={folder.id} data={folder.name} class="folder-delete-rename-btns">
          {deleteEditBtns}
        </Col>
        {
          this.state.activeFolderId == folder.id
            ?  <ThumbnailView action={changeActiveImage} dispatch={this.props.dispatch} items={folder.images} class="thumbnail-view" title="" />
            : null
        }
      </Row>
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
            <DeleteModal
              action={deleteFolder}
              callBackParent={this.onChildChanged.bind(this)}
              childKey="showDeleteModal"
              dispatch={this.props.dispatch}
              folderId={this.state.activeFolderId}
              folderName={this.state.activeFolderName}
              showModal={this.state.showDeleteModal}
              type="Folder"
            />
            <RenameModal
              action={renameFolder}
              callBackParent={this.onChildChanged.bind(this)}
              childKey="showRenameModal"
              dispatch={this.props.dispatch}
              folderId={this.state.activeFolderId}
              folderName={this.state.activeFolderName}
              showModal={this.state.showRenameModal}
              type="Folder"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
