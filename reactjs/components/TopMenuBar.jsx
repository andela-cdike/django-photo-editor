import React from 'react';
import {
  Nav, NavItem
} from 'react-bootstrap';

import {
  saveImageProcessing, showSpinner, undoImageProcessing
} from '../actions/imageActions';

import CustomAlert from './CustomAlert';
import UploadImageButton from './TopMenuBar/UploadImageButton';


export default class TopMenuBar extends React.Component {
  constructor() {
    super();
    this.state = {
      shareIsDisabled: true,
      alertVisible: false,
    };
  }

  componentWillReceiveProps(nextprops) {
    // enable if there is an image on image pane
    if (nextprops.activeImage.id) {
      this.setState({ shareIsDisabled: false})
    }
  }

  onChildChanged(childKey, state) {
    // update visibility of alert from child
    this.setState({ [childKey]: state});
  }

  handleShare() {
    const fbShareHref = (`https://www.facebook.com/sharer/sharer.php?u=
      ${encodeURIComponent(this.props.activeImage.url)}&amp;src=sdkpreparse`
    );

    if (this.props.processingInProgress) {
      this.setState({ alertVisible: true });
    } else {
      window.open(fbShareHref, '_blank');
    }
  }

  save() {
    this.props.dispatch(showSpinner());
    this.props.dispatch(saveImageProcessing(this.props.activeImage.id));
  }

  undo() {
    this.props.dispatch(showSpinner());
    this.props.dispatch(undoImageProcessing());
  }

  render() {
    const message = (
      "You need to either cancel or save the current changes to share image"
    );
    return (
      <Nav
        bsStyle="pills"
        pullRight
      >
        <UploadImageButton
          dispatch={this.props.dispatch}
          folders={this.props.folders}
          uploadImageErrorStatus={this.props.uploadImageErrorStatus}
        />
        <NavItem
          eventKey={2} title="Item"
          disabled={!this.props.processingInProgress}
          onClick={this.save.bind(this)}
        >
          <i class="fa fa-floppy-o" aria-hidden="true"></i>
          &nbsp; Save
        </NavItem>
        <NavItem
          eventKey={3}
          disabled={!this.props.processingInProgress}
          onClick={this.undo.bind(this)}
        >
          <i class="fa fa-times" aria-hidden="true"></i>
          &nbsp; Undo
        </NavItem>
        <NavItem
          class="fb-share-button" data-href={this.props.activeImage.url}
          data-layout="button" data-size="small" data-mobile-iframe="true"
          eventKey={4} disabled={this.state.shareIsDisabled}
          onClick={this.handleShare.bind(this)}
        >
          <i class="fa fa-facebook-official" aria-hidden="true"></i>
          &nbsp; Share
        </NavItem>

        <CustomAlert
          callBackParent={this.onChildChanged.bind(this)}
          childKey="alertVisible"
          spanClass="share-error-alert"
          style="danger"
          title="ERROR"
          message={message}
          showAlert={this.state.alertVisible}
        />

      </Nav>
    );
  }
}
