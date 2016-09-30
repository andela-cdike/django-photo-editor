import React from 'react';
import {
  Col, Image, Row
} from 'react-bootstrap';

export default class ImagePane extends React.Component {
  render() {
    const spinnerAnimation = (
      <div id="spinner-icon">
        <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
        <span class="sr-only">Loading...</span>
      </div>      
    );

    return (
      <Row>
        <Col md={12}>
          <Image id="active-image" src={this.props.activeImage.url} responsive alt="Current Image" />
          { this.props.showSpinner ? spinnerAnimation : null }
        </Col>
      </Row>
    );
  }
}