import React from 'react';
import {
  Button, Col, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';

import {
  changeActiveImage, deleteImage, renameImage, showSpinner,
} from '../../actions/imageActions';
import { deleteFolder, renameFolder } from '../../actions/folderActions';

import AddNewFolder from '../FinderToolBar/AddNewFolder';
import DeleteModal from '../DeleteModal';
import RenameModal from '../RenameModal';
import ThumbnailView from './ThumbnailView';


export default class FinderToolBar extends React.Component {
  constructor() {
    super();
    this.onChildChanged = this.onChildChanged.bind(this);
    this.openFolderModals = this.openFolderModals.bind(this);
    this.openImageActionModals = this.openImageActionModals.bind(this);
    this.toggleFolderIcon = this.toggleFolderIcon.bind(this);
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
    };
  }

  onChildChanged(childKey, state) {
    this.setState({ [childKey]: state });
  }

  toggleFolderIcon(e) {
    const elementId = Number(e.currentTarget.id);
    if (this.state.activeFolderId === elementId) {
      this.setState({ activeFolderId: null });
    } else {
      this.setState({ activeFolderId: elementId });
    }
  }

  openFolderModals(e) {
    e.preventDefault();
    const key = e.currentTarget.name;
    const element = e.currentTarget.parentNode.parentNode;
    const folderId = element.getAttribute('id');
    const folderName = element.getAttribute('data');
    this.setState({
      [key]: true,
      activeFolderId: Number(folderId),
      activeFolderName: folderName,
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
    });
  }

  render() {
    const { folders } = this.props;
    const count = folders.length;
    const closedFolderIcon = <i className="fa fa-folder" aria-hidden="true" />;
    const openFolderIcon = <i className="fa fa-folder-open" aria-hidden="true" />;

    const folderMenuBtns = (
      <span>
        <Button bsStyle="link" name="showRenameFolderModal" onClick={this.openFolderModals}>
          <i className="fa fa-pencil" aria-hidden="true" show={false} />
        </Button>
        <Button bsStyle="link" name="showDeleteFolderModal" onClick={this.openFolderModals}>
          <i className="fa fa-times-circle-o" show />
        </Button>
      </span>
    );

    const imgMenu = (
      <span className="image-menu-btns">
        <a
          name="showDeleteImageModal" className="delete-image-link"
          href="" onClick={this.openImageActionModals}
        >
          <i className="fa fa-times-circle-o" aria-hidden="true" />
        </a>
        <a
          name="showRenameImageModal" className="rename-image-link"
          href="" onClick={this.openImageActionModals}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </a>
      </span>
    );


    const mappedFolders = folders.map(folder =>
      <Row key={folder.id} class="folder-list-item">
        <Col md={9}>
          <ListGroupItem
            id={folder.id}
            onClick={this.toggleFolderIcon}
          >
            {
              this.state.activeFolderId === folder.id
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
          this.state.activeFolderId === folder.id
            ? (
              <ThumbnailView
                class="thumbnail-view" action={changeActiveImage}
                dispatch={this.props.dispatch} items={folder.images}
                showSpinner={showSpinner} thumbnailMenu={imgMenu} title=""
                token={this.props.token}
              />
              )
            : null
        }
      </Row>
    );

    return (
      <div>
        <Row>
          <Col md={10}>FOLDERS</Col>
          <AddNewFolder
            count={count}
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
                token: this.props.token,
              }}
              callBackParent={this.onChildChanged}
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
                token: this.props.token,
              }}
              callBackParent={this.onChildChanged}
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
                token: this.props.token,
              }}
              callBackParent={this.onChildChanged}
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
                token: this.props.token,
              }}
              callBackParent={this.onChildChanged}
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

FinderToolBar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  folders: React.PropTypes.arrayOf(
    React.PropTypes.object,
  ),
  token: React.PropTypes.string.isRequired,
};
