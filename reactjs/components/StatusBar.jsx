import React from 'react';
import {
  Col, Row
} from 'react-bootstrap';


export default class StatusBar extends React.Component {
  render() {
    return(
      <Row>
        <Col sm={3} smOffset={1}>
          <p>
            {this.props.statistics.numFolders} Folders, &nbsp;
            {this.props.statistics.numImages} images
          </p>
        </Col>
        <Col sm={2}>
          <p>
            {this.props.showSpinner ? 'Busy....' : null}
          </p>
        </Col>
        <Col sm={3}>
          <p>
            {this.props.activeImage.name}
          </p>
        </Col>
        <Col sm={3}>
          <p>
            {this.props.processingInProgress ? 'You have unsaved changes' : null}
          </p>
        </Col>
      </Row>
    );
  }
}