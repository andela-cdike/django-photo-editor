import React from 'react';
import { 
    Button, Col, Checkbox, ControlLabel, Form,
    FormGroup, FormControl, Modal, Overlay,
    Popover, Tooltip 
} from 'react-bootstrap'
import { findDOMNode } from 'react-dom';

import { addFolder, fetchFolders } from '../../actions/folderActions';


export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
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
        this.setState({ showTooltip: true});
      }
    }, 2000);
  }

  focusNameInput() {
    // focus on name input field when modal loads
    findDOMNode(this.refs.nameInput).focus();
  }

  // show error message to user submits empty field
  validateNameFieldFailed() {
    if (this.state.name.length === 0) {
      this.setState({ showNameInputSubmitError: true });  
      setTimeout(() => {
        this.setState({ showNameInputSubmitError: false });  
      }, 2000)
      return true
    }
    return false
  }

  addFolder() {
    // add new Folder
    const { dispatch} = this.props;
    const { name } = this.state;

    if (this.validateNameFieldFailed()) {
      return;
    }
    dispatch(addFolder(name));
    dispatch(fetchFolders());
    this.setState({ name: '' });
    this.close();
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  // store name field in a state
  handleChange(e) {
    const name = e.target.value;
    this.setState({ name: name});
  }

  // store checkbox value in state
  handleClick(e) {
    this.setState({ done: e.target.checked });
  }

  // enter key should submit the form
  handleKeyPress(e) {
    if (e.charCode == 13) {
      e.preventDefault();
      this.addFolder();
    }
  }

  // show tooltip
  toggleTooltipOn() {
    this.setState({ showTooltip: true});
  }

  // hide tooltip
  toggleTooltipOff() {
    this.setState({ showTooltip: false});
  }

  render() {
    return (
      <Col md={2}>
        <div id="add-folder-button"> 
          <Button
            bsStyle="default"
            ref="addFolderButton"
            onMouseEnter={this.toggleTooltipOn.bind(this)}
            onMouseLeave={this.toggleTooltipOff.bind(this)}
            onClick={this.open.bind(this)}
          >
            <i class="fa fa-plus-square-o" aria-hidden="true"></i>
          </Button>

          <Overlay
            show={this.state.showTooltip}
            target={() => findDOMNode(this.refs.addFolderButton)}
            placement="bottom"
          >
            <Tooltip id="tooltip">Add Folder</Tooltip>
          </Overlay>
        </div>

        <Modal
          show={this.state.showModal}
          onHide={this.close.bind(this)}
          onEnter={this.focusNameInput.bind(this)}>
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
            <Button onClick={this.addFolder.bind(this)}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>          
      </Col>
    )
  }
}
