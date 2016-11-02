import React from 'react';
import {
  Col, Image, Row,
} from 'react-bootstrap';

const ImagePane = ({ activeImage, showSpinner }) => {
  const spinnerAnimation = (
    <div id="spinner-icon">
      <i className="fa fa-spinner fa-pulse fa-5x fa-fw" />
      <span className="sr-only">Loading...</span>
    </div>
  );

  const content = (
    <Col md={12}>
      <Image id="active-image" src={activeImage.url} responsive alt="Current Image" />
      { showSpinner ? spinnerAnimation : null }
    </Col>
  );

  return (
    <Row>
      {
        activeImage.id
          ? content
          : null
      }
    </Row>
  );
};

// Disable eslint here because it doesn't yet support shape proptype
/* eslint-disable */
ImagePane.propTypes = {
  activeImage: React.PropTypes.shape({
    id: React.PropTypes.number,
    url: React.PropTypes.string,
  }),
  showSpinner: React.PropTypes.bool,
};
/* eslint-enable */

export default ImagePane;
