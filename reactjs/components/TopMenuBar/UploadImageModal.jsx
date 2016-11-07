import React from 'react';
import {
  Button, Col, ControlLabel, Form, FormControl, FormGroup,
  Modal, Overlay, Popover,
} from 'react-bootstrap';
import { findDOMNode } from 'react-dom';

import {
  resetUploadErrorStatus, uploadImage, showSpinner,
} from '../../actions/imageActions';


export default class UploadImageModal extends React.Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    this.focusNameInput = this.focusNameInput.bind(this);
    this.handleFolderChange = this.handleFolderChange.bind(this);
    this.handleImageFileChange = this.handleImageFileChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.hidePopover = this.hidePopover.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    this.state = {
      folderId: null,
      image: null,
      name: '',
      showModal: props.showModal,
      nameFieldValid: true,
      folderFieldValid: true,
      imageFieldValid: true,
      imageValidityState: null,
      uploadImageFailed: false,
    };
  }

  componentWillReceiveProps(nextprops) {
    // update folders if upload was sucessful else show user error
    switch (nextprops.uploadImageErrorStatus.status) {
      case 'error': {
        this.setState({ uploadImageFailed: true });
        break;
      }
      case 'success': {
        this.close();
        break;
      }
      default: {
        this.setState({
          folderId: nextprops.defaultFolderId,
          showModal: nextprops.showModal,
        });
      }
    }
  }

  focusNameInput() {
    findDOMNode(this.nameInput).focus();
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      this.uploadImage();
    }
  }

  handleFolderChange(e) {
    this.setState({ folderId: e.target.value });
  }

  handleImageFileChange(e) {
    const file = e.target.files[0];

    if (file.type.split('/')[0] === 'image') {
      this.setState({
        image: file,
        imageValidityState: 'success',
        name: file.name,
      });
      return true;
    }
    this.setState({ imageValidityState: 'error' });
    return false;
  }

  hidePopover() {
    // hide popover after 8s
    setTimeout(() => {
      this.setState({ uploadImageFailed: false });
    }, 8000);
  }

  close() {
    this.props.dispatch(resetUploadErrorStatus());
    this.setState({
      name: '',
      showModal: false,
    });
    this.props.callBackParent(this.props.childKey, false);
  }

  uploadImage() {
    const { token, dispatch } = this.props;
    const { folderId, image, name } = this.state;

    if (this.state.imageValidityState === 'success') {
      dispatch(showSpinner());
      dispatch(uploadImage(token, name, folderId, image));
    } else {
      this.setState({ uploadImageFailed: true });
    }
  }

  render() {
    const { folders } = this.props;
    const imageErrorMessage = (
      this.state.imageValidityState
        ? 'Select a valid image file'
        : null
    );
    const mappedFolders = folders.map(folder =>
      <option key={folder.id} value={folder.id}>{folder.name}</option>
    );

    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        onEnter={this.focusNameInput}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form horizontal onKeyPress={this.handleKeyPress}>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={1}>
                Name
              </Col>
              <Col sm={11}>
                <FormControl
                  value={this.state.name}
                  type="text"
                  placeholder="Leave blank if you want the original image name to be used"
                  ref={(input) => { this.nameInput = input; }}
                  onChange={this.handleNameChange}
                />
                <Overlay
                  show={this.state.uploadImageFailed}
                  target={() => this.nameInput}
                  placement="bottom"
                  onEntered={this.hidePopover}
                >
                  <Popover id="popover-positioned-bottom" title="Input Error">
                    {this.props.uploadImageErrorStatus.msg}
                  </Popover>
                </Overlay>
              </Col>
            </FormGroup>
            <FormGroup controlId="folder">
              <Col componentClass={ControlLabel} sm={1}>
                <ControlLabel>Folder</ControlLabel>
              </Col>
              <Col sm={11}>
                <FormControl
                  componentClass="select"
                  placeholder="Select folder"
                  onChange={this.handleFolderChange}
                >
                  {mappedFolders}
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="image-file"
              validationState={this.state.imageValidityState}
            >
              <Col componentClass={ControlLabel} sm={1}>
                <ControlLabel>Image</ControlLabel>
              </Col>
              <Col sm={11}>
                <FormControl
                  type="file" accept="image/*"
                  onChange={this.handleImageFileChange}
                />
                {imageErrorMessage || 'Click to select Image to upload'}
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button onClick={this.uploadImage}>Upload</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

UploadImageModal.propTypes = {
  callBackParent: React.PropTypes.func.isRequired,
  childKey: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  folders: React.PropTypes.arrayOf(
    React.PropTypes.object,
  ),
  showModal: React.PropTypes.bool.isRequired,
  token: React.PropTypes.string.isRequired,
  uploadImageErrorStatus: React.PropTypes.objectOf(
    React.PropTypes.string,
  ),
};
