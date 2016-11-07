import React from 'react';
import { Alert, Button } from 'react-bootstrap';


export default class CustomAlert extends React.Component {
  constructor() {
    super();
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.state = {
      alertVisible: false,
    };
  }

  componentWillReceiveProps(nextprops) {
    this.setState({ alertVisible: nextprops.showAlert });
  }

  handleAlertDismiss() {
    // update both component and parent's show modal state
    this.setState({ alertVisible: false });
    this.props.callBackParent(this.props.childKey, false);
  }

  render() {
    const { spanClass, message, customStyle, title } = this.props;
    const alert = (
      <Alert bsStyle={customStyle} onDismiss={this.handleAlertDismiss}>
        <h4>{title}</h4>
        <p>{message}</p>

        <p>
          <Button bsStyle={customStyle} onClick={this.handleAlertDismiss}>
            Close
          </Button>
        </p>
      </Alert>
    );

    return (
      <span clasNames={spanClass}>
        { this.state.alertVisible ? alert : null }
      </span>
    );
  }
}

CustomAlert.propTypes = {
  callBackParent: React.PropTypes.func.isRequired,
  childKey: React.PropTypes.string.isRequired,
  message: React.PropTypes.string,
  spanClass: React.PropTypes.string,
  customStyle: React.PropTypes.string,
  title: React.PropTypes.string,
};
