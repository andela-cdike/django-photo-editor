import React from 'react';
import{ Alert, Button } from 'react-bootstrap';


export default class CustomAlert extends React.Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({ alertVisible: nextprops.showAlert});
  }

  handleAlertDismiss() {
    // update both component and parent's show modal state
    this.setState({ alertVisible: false });
    this.props.callBackParent(this.props.childKey, false);
  }

  render() {
    const { spanClass, message, style, title } = this.props;
    const alert = (
      <Alert bsStyle={style} onDismiss={this.handleAlertDismiss.bind(this)}>
        <h4>{title}</h4>
        <p>{message}</p>
        
        <p>
          <Button bsStyle={style} onClick={this.handleAlertDismiss.bind(this)}>
            Close
        </Button>
        </p>
      </Alert>
    );

    return (
      <span class={spanClass}>
        { this.state.alertVisible ? alert : null }
      </span>
    );
  }
}