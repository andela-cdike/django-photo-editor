import React from 'react';
import {
  Alert, Button, Modal
} from 'react-bootstrap';


export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: props.showModal
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.showModal });
  }

  close() {
    // update both component and parent's showModal state
    this.setState({ showModal: false});
    this.props.callBackParent(this.props.childKey, false);
  }

  delete() {
    this.props.dispatch(this.props.action(this.props.folderId));
    this.close();
  }

  render() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close.bind(this)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {this.props.type}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Alert bsStyle="warning">
              <strong>Are you sure you want to delete the {this.props.folderName} folder?</strong>
            </Alert>
          </Modal.Body>
          
        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Cancel</Button>
          <Button onClick={this.delete.bind(this)} autoFocus>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>  
    );
  }
}