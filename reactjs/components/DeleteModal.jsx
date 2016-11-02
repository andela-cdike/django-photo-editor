import React from 'react';
import {
  Alert, Button, Modal,
} from 'react-bootstrap';


export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      showModal: props.showModal,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.showModal });
  }

  close() {
    // update both component and parent's showModal state
    this.setState({ showModal: false });
    this.props.callBackParent(this.props.childKey, false);
  }

  delete() {
    this.props.dispatch(this.props.action(this.props.arguments));
    this.close();
  }

  render() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {this.props.type}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Alert bsStyle="warning">
            <strong>Are you sure you want to delete the {this.props.itemName} folder?</strong>
          </Alert>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button onClick={this.delete} autoFocus>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

DeleteModal.propTypes = {
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
