import React from 'react';
import {
  Nav, NavItem
} from 'react-bootstrap';

import { undoImageProcessing } from '../actions/imageActions';

import UploadImageButton from './TopMenuBar/UploadImageButton';


export default class TopMenuBar extends React.Component {
  constructor() {
    super();
    this.state = {
      shareIsDisabled: true
    };
  }

  componentWillReceiveProps() {
    // enable if there is an image on image pane
    if (this.props.activeImage.id) {
      this.setState({ shareIsDisabled: false})
    }
  }

  handleSelect(selectedKey) {
    alert('selected ' + selectedKey);
  }

  undo() {
    this.props.dispatch(undoImageProcessing());
  }

  render() {
    console.log('processingInprog: ', this.props.processingInProgress)
    return (
      <Nav
        bsStyle="pills"
        pullRight
        onSelect={this.handleSelect.bind(this)}
      >
        <UploadImageButton
          dispatch={this.props.dispatch}
          folders={this.props.folders}
          uploadImageErrorStatus={this.props.uploadImageErrorStatus}
        />
        <NavItem
          eventKey={2} title="Item"
          disabled={!this.props.processingInProgress}
        >
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          &nbsp; Apply
        </NavItem>
        <NavItem
          eventKey={3}
          disabled={!this.props.processingInProgress}
          onClick={this.undo.bind(this)}
        >
          <i class="fa fa-times" aria-hidden="true"></i>
          &nbsp; Undo
        </NavItem>
        <NavItem eventKey={4} disabled={this.state.shareIsDisabled}>
          <i class="fa fa-facebook-official" aria-hidden="true"></i>
          &nbsp; Share
        </NavItem>
      </Nav>
    );
  }
}