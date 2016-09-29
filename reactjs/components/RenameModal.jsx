import React from 'react';
import {
  Button, Col, ControlLabel, Form, FormControl,
  FormGroup, Modal, Overlay, Popover
} from 'react-bootstrap';
import { findDOMNode } from 'react-dom';


export default class RenameModal extends React.Component {
  constructor(props) {
    super(props);
    console.log('levels: ', props.folderName)
    this.state = {
      name: props.folderName,
      showModal: props.showModal
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      name: nextProps.folderName,
      showModal: nextProps.showModal 
    });
  }

  close() {
    // update both component and parent's showModal state
    this.setState({ showModal: false });
    this.props.callBackParent(this.props.childKey, false);
  }

  focusNameInput() {
    // focus on name input and move forward
    const element = findDOMNode(this.refs.nameInput);
    console.log("CHEK: ", element)
    const temp_value = element.value;
    element.focus();
    element.value = '';
    element.value = temp_value;
  }

  handleChange(e) {
    this.setState({ name: e.target.value})
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      this.rename();
    }
  }

  rename() {
    this.props.dispatch(this.props.action(
      this.props.folderId, this.state.name
    ));
    this.close();
  }

  render() {
    console.log('MUNA CIKIN SANYI: ', this.state.name)
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close.bind(this)}
        onEnter={this.focusNameInput.bind(this)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rename {this.props.type}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={1}>
                Name
              </Col>
              <Col sm={11}>
                <FormControl
                  value={this.state.name}
                  type="text"
                  ref="nameInput"
                  onChange={this.handleChange.bind(this)}
                  onKeyPress={this.handleKeyPress.bind(this)}
                />
                <Overlay
                  show={this.state.showNameInputSubmitError}
                  target={() => findDOMNode(this.refs.nameInput)}
                  placement="bottom"
                >
                  <Popover id="popover-positioned-bottom" title="Input Error">
                    This field cannot be empty
                  </Popover>
                </Overlay>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Cancel</Button>
          <Button onClick={this.rename.bind(this)}>
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
