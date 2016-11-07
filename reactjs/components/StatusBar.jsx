import React from 'react';
import { Col, Row } from 'react-bootstrap';


const StatusBar = ({ activeImage, processingInProgress, showSpinner, statistics }) => (
  <Row>
    <Col sm={3} smOffset={1}>
      <p>
        {statistics.numFolders} Folders, &nbsp;
        {statistics.numImages} images
      </p>
    </Col>
    <Col sm={2}>
      <p>
        {showSpinner ? 'Busy....' : null}
      </p>
    </Col>
    <Col sm={3}>
      <p>
        {activeImage.name}
      </p>
    </Col>
    <Col sm={3}>
      <p>
        {processingInProgress ? 'You have unsaved changes' : null}
      </p>
    </Col>
  </Row>
);

// Disable eslint here because it doesn't yet support shape proptype
/* eslint-disable */
StatusBar.propTypes = {
  activeImage: React.PropTypes.shape({
    id: React.PropTypes.number,
    url: React.PropTypes.string,
  }),
  processingInProgress: React.PropTypes.bool.isRequired,
  showSpinner: React.PropTypes.bool.isRequired,
  statistics: React.PropTypes.shape([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
};
/* eslint-enable */

export default StatusBar;
