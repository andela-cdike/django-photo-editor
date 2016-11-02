import React from 'react';
import {
    Button, Col, ControlLabel, Form,
    FormGroup, FormControl, Modal, Overlay,
    Popover, Tooltip,
} from 'react-bootstrap';
import { findDOMNode } from 'react-dom';


import { addFolder } from '../../actions/folderActions';


export default class AddNewFolder extends React.Component {
  constructor() {
    super();
    this.addFolder = this.addFolder.bind(this);
    this.close = this.close.bind(this);
    this.focusNameInput = this.focusNameInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.open = this.open.bind(this);
    this.toggleTooltipOn = this.toggleTooltipOn.bind(this);
    this.toggleTooltipOff = this.toggleTooltipOff.bind(this);
    this.state = {
      showModal: false,
      showTooltip: false,
      showPopover: false,
      showNameInputSubmitError: false,
      name: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.count === 0) {
        this.setState({ showTooltip: true });
      }
    }, 2000);
  }

  focusNameInput() {
    // focus on name input field when modal loads
    findDOMNode(this.nameInput).focus();
  }

  // show error message to user submits empty field
  validateNameFieldFailed() {
    if (this.state.name.length === 0) {
      this.setState({ showNameInputSubmitError: true });
      setTimeout(() => {
        this.setState({ showNameInputSubmitError: false });
      }, 2000);
      return true;
    }
    return false;
  }

  addFolder() {
    // add new Folder
    const { dispatch, token } = this.props;
    const { name } = this.state;

    if (this.validateNameFieldFailed()) {
      return;
    }
    dispatch(addFolder(token, name));
    this.setState({ name: '' });
    this.close();
  }

  close() {
    this.setState({ showModal: false });
  }

  open(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  // store name field in a state
  handleChange(e) {
    const name = e.target.value;
    this.setState({ name });
  }

  // store checkbox value in state
  handleClick(e) {
    this.setState({ done: e.target.checked });
  }

  // enter key should submit the form
  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      this.addFolder();
    }
  }

  // show tooltip
  toggleTooltipOn() {
    this.setState({ showTooltip: true });
  }

  // hide tooltip
  toggleTooltipOff() {
    this.setState({ showTooltip: false });
  }

  render() {
    return (
      <Col md={2}>
        <div id="add-folder-button">
          <Button
            bsStyle="link"
            ref={(input) => { this.addFolderButton = input; }}
            onMouseEnter={this.toggleTooltipOn}
            onMouseLeave={this.toggleTooltipOff}
            onClick={this.open}
          >
            <i className="fa fa-plus-circle" aria-hidden="true" />
          </Button>

          <Overlay
            show={this.state.showTooltip}
            target={() => this.addFolderButton}
            placement="bottom"
          >
            <Tooltip id="tooltip">Add Folder</Tooltip>
          </Overlay>
        </div>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
          onEnter={this.focusNameInput}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Folder</Modal.Title>
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
                    placeholder="Holiday"
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
            <Button onClick={this.addFolder}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

AddNewFolder.propTypes = {
  count: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired,
  token: React.PropTypes.string.isRequired,
};
