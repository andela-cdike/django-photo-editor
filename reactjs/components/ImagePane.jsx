import React from 'react';
import {
  Col, Image, Row
} from 'react-bootstrap';

export default class ImagePane extends React.Component {
  render() {
    console.log('Image_pane: ', this.props.activeImage)
  
    return (
      <Row>
        <Col md={12}>
          <Image id="active-image" src={this.props.activeImage} responsive alt="Current Image" />
        </Col>
      </Row>
    );
  }
}