import React from 'react';
import {
  Button, Col, ControlLabel, Form, FormControl, FormGroup,
  Modal, NavItem, Overlay, Popover
} from 'react-bootstrap';
import { findDOMNode } from 'react-dom'

import { fetchFolders } from '../../actions/folderActions';
import {
  resetUploadErrorStatus, uploadImage, showSpinner
} from '../../actions/imageActions';


export default class UploadImageButton extends React.Component {
  constructor() {
    super();
    this.state = {
      folderId: null,
      image: null,
      name: '',
      showModal: false,
      nameFieldValid: true,
      folderFieldValid: true,
      imageFieldValid: true,
      imageValidityState: null,
      uploadImageFailed: false,
    }
  }

  componentWillReceiveProps() {
    // update folders if upload was sucessful else show user error
    if (this.props.uploadImageErrorStatus.status === 'error') {
      this.setState({ uploadImageFailed: true });
    } else if (this.props.uploadImageErrorStatus.status === 'success') {
      this.close();
    }
  }

  focusNameInput(component, e) {
    findDOMNode(this.refs.nameInput).focus();
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleKeyPress() {
    if (e.charCode === 13) {
      e.preventDefault();
      this.uploadImage();
    }
  }

  handleFolderChange(e) {
    this.setState({ folderId: e.target.value });
  }

  handleImageFileChange(e) {
    let file = e.target.files[0];

    if (file.type.split('/')[0] === 'image') {
      this.setState({ 
        image: file,
        imageValidityState: 'success',
        name: file.name
      });
      return true;
    } else {
      this.setState({ imageValidityState: 'error' });
      return false;
    }
  }

  hidePopover() {
    // hide popover after 8s
    setTimeout(()=> {
      this.setState({ uploadImageFailed: false });
    }, 8000);
  }

  close() {
    this.props.dispatch(resetUploadErrorStatus());
    this.setState({
      name: '',
      showModal: false 
    });
  }

  open() {
    this.setState({
      folderId:  this.props.folders.folders[0].id,
      showModal: true 
    });
  }

  uploadImage() {
    const {dispatch} = this.props;
    const { folderId, image, name } = this.state;
    
    if (this.state.imageValidityState === 'success') {
      dispatch(showSpinner());
      dispatch(uploadImage(name, folderId, image));
    }
    else {
      this.setState({ uploadImageFailed: true });
    }
  }

  render() {
    const { folders } = this.props.folders;
    const imageErrorMessage = (
      this.state.imageValidityState
        ? 'Select a valid image file'
        : null
    );
    const mappedFolders = folders.map((folder, i) => 
      <option key={folder.id} value={folder.id}>{folder.name}</option>
    );

    return (
      <NavItem
        eventKey={1} href="#"
        ref="UploadImageButton"
        onClick={this.open.bind(this)}
      >
        <i class="fa fa-upload" aria-hidden="true"></i>
        &nbsp; Upload Image
      
        <Modal
          show={this.state.showModal}
          onHide={this.close.bind(this)}
          onEnter={this.focusNameInput.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form horizontal onKeyPress={this.handleKeyPress.bind(this)}>
              <FormGroup controlId="name">
                <Col componentClass={ControlLabel} sm={1}>
                  Name
                </Col>
                <Col sm={11}>
                  <FormControl
                    value={this.state.name}
                    type="text"
                    placeholder="Leave blank if you want the original image name to be used"
                    ref="nameInput"
                    onChange={this.handleNameChange.bind(this)}
                  />
                  <Overlay
                    show={this.state.uploadImageFailed}
                    target={() => findDOMNode(this.refs.nameInput)}
                    placement="bottom"
                    onEntered={this.hidePopover.bind(this)}
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
                    onChange={this.handleFolderChange.bind(this)}
                  >
                    {mappedFolders}
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup
                controlId="image-file"
                validationState={this.state.imageValidityState}
              >
                <Col sm={ControlLabel} sm={1}>
                  <ControlLabel>Image</ControlLabel>
                </Col>
                <Col sm={11}>
                  <FormControl
                    type="file" accept="image/*"
                    onChange={this.handleImageFileChange.bind(this)}
                  />
                  {imageErrorMessage || 'Click to select Image to upload'}
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button onClick={this.uploadImage.bind(this)}>Upload</Button>
          </Modal.Footer>
        </Modal>
      </NavItem>
    );
  }
}
