import React from 'react';
import {
  Button, Col, ListGroup, ListGroupItem, Row
} from 'react-bootstrap';

import {
  changeActiveImage, deleteImage, renameImage, showSpinner
} from '../../actions/imageActions';
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
      activeImageId: null,
      activeImageName: null,
      showEditDeleteBtns: false,
      showDeleteFolderModal: false,
      showRenameFolderModal: false,
      showDeleteImageModal: false,
      showRenameImageModal: false,
    }
  }

  toggleFolderIcon(e) {
    const elementId = e.currentTarget.id;
    if (this.state.activeFolderId === elementId){
      this.setState({ activeFolderId: null })
    }
    else {
      this.setState({ activeFolderId: e.currentTarget.id })
    }
  }

  onChildChanged(childKey, state) {
    this.setState({ [childKey]: state });
  }

  openFolderModals(e) {
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

  openImageActionModals(e) {
    e.preventDefault();
    const key = e.currentTarget.name;
    const element = e.currentTarget.parentNode.previousSibling;
    const imageId = element.getAttribute('id');
    const folderId = element.getAttribute('data-folderid');
    const imageName = element.getAttribute('name');
    this.setState({
      [key]: true,
      activeFolderId: Number(folderId),
      activeImageId: Number(imageId),
      activeImageName: imageName,
    })
  }

  render() {
    const { folders } = this.props.folders;
    const closedFolderIcon = <i class="fa fa-folder" aria-hidden="true"></i>;
    const openFolderIcon = <i class="fa fa-folder-open" aria-hidden="true"></i>;

    const folderMenuBtns = (
      <span>
        <a href="#" name="showDeleteFolderModal" onClick={this.openFolderModals.bind(this)}>
          <i class="fa fa-ban" aria-hidden="true" show={true}></i>
        </a>
        &nbsp;
        <a href="#" name="showRenameFolderModal" onClick={this.openFolderModals.bind(this)}>
          <i class="fa fa-pencil" aria-hidden="true" show={false}></i>
        </a>
      </span>
    );
    
    const imgMenu = (
      <span class="image-menu-btns">
        <a
          name="showDeleteImageModal" class="delete-image-link"
          href="" onClick={this.openImageActionModals.bind(this)}
        >
          <i class="fa fa-times-circle-o" aria-hidden="true"></i>
        </a>
        <a
          name="showRenameImageModal" class="rename-image-link"
          href="" onClick={this.openImageActionModals.bind(this)}
        >
          <i class="fa fa-pencil" aria-hidden="true"></i>
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
          {folderMenuBtns}
        </Col>
        {
          this.state.activeFolderId == folder.id
            ? (<ThumbnailView
                class="thumbnail-view" action={changeActiveImage}
                dispatch={this.props.dispatch} items={folder.images}
                showSpinner={showSpinner} thumbnailMenu={imgMenu} title=""
                token={this.props.token}
               />)
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
              token={this.props.token}
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
              arguments={{
                folderId: this.state.activeFolderId,
                token: this.props.token
              }}
              callBackParent={this.onChildChanged.bind(this)}
              childKey="showDeleteFolderModal"
              dispatch={this.props.dispatch}
              itemName={this.state.activeFolderName}
              showModal={this.state.showDeleteFolderModal}
              type="Folder"
            />
            <RenameModal
              action={renameFolder}
              arguments={{
                folderId: this.state.activeFolderId,
                token: this.props.token
              }}
              callBackParent={this.onChildChanged.bind(this)}
              childKey="showRenameFolderModal"
              dispatch={this.props.dispatch}
              itemName={this.state.activeFolderName}
              showModal={this.state.showRenameFolderModal}
              type="Folder"
            />
            <DeleteModal
              action={deleteImage}
              arguments={{
                folderId: this.state.activeFolderId,
                imageId: this.state.activeImageId,
                token: this.props.token
              }}
              callBackParent={this.onChildChanged.bind(this)}
              childKey="showDeleteImageModal"
              dispatch={this.props.dispatch}
              itemName={this.state.activeImageName}
              showModal={this.state.showDeleteImageModal}
              type="Image"
            />
            <RenameModal
              action={renameImage}
              arguments={{
                folderId: this.state.activeFolderId,
                imageId: this.state.activeImageId,
                token: this.props.token
              }}
              callBackParent={this.onChildChanged.bind(this)}
              childKey="showRenameImageModal"
              dispatch={this.props.dispatch}
              itemName={this.state.activeImageName}
              showModal={this.state.showRenameImageModal}
              type="Image"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
