import React from 'react';
import {
  Button, Col, ControlLabel, Form, FormControl,
  FormGroup, Modal, Overlay, Popover,
} from 'react-bootstrap';
import { findDOMNode } from 'react-dom';


export default class RenameModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.focusNameInput = this.focusNameInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.rename = this.rename.bind(this);
    this.state = {
      name: props.itemName,
      showModal: props.showModal,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.itemName,
      showModal: nextProps.showModal,
    });
  }

  close() {
    // update both component and parent's showModal state
    this.setState({ showModal: false });
    this.props.callBackParent(this.props.childKey, false);
  }

  focusNameInput() {
    // focus on name input and move forward
    const element = findDOMNode(this.nameInput);
    const tempValue = element.value;
    element.focus();
    element.value = '';
    element.value = tempValue;
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      this.rename();
    }
  }

  rename() {
    const args = Object.assign({}, this.props.arguments,
      { name: this.state.name }
    );
    this.props.dispatch(this.props.action(args));
    this.close();
  }

  render() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        onEnter={this.focusNameInput}
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
                  ref={(input) => { this.nameInput = input; }}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                />
                <Overlay
                  show={this.state.showNameInputSubmitError}
                  target={() => this.nameInput}
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
          <Button onClick={this.close}>Cancel</Button>
          <Button onClick={this.rename}>
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

RenameModal.propTypes = {
  action: React.PropTypes.func.isRequired,
  arguments: React.PropTypes.oneOfType([
    React.PropTypes.any,
  ]),
  callBackParent: React.PropTypes.func.isRequired,
  childKey: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  itemName: React.PropTypes.string,
  showModal: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
};
