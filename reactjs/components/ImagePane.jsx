import React from 'react';
import {
  Col, Image, Row
} from 'react-bootstrap';

export default class ImagePane extends React.Component {
  render() {
    const image_url = "http://res.cloudinary.com/andela-troupon/image/upload/v1473933078/w7dizwpiftulvy3arneh.png";

    return (
      <Row>
        <Col md={12}>
          <Image id="active-image" src={image_url} width="80%" responsive alt="Current Image" />
        </Col>
      </Row>
    );
  }
}