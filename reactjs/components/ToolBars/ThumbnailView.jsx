import React from 'react';
import {
  Col, Image, Row
} from 'react-bootstrap';

var Packery = require('react-packery-component')(React);


export default class ThumbNailView extends React.Component {
  render() {
    const { id, title, tools } = this.props;
    const mappedTools = tools.map((tool, i) =>
      <Col key={i} md={4}>
        <Image
          src={tool.thumbnail_image_url}
          alt={tool.name}
          height="60"
          rounded
        />
        <figcaption>{tool.name}</figcaption>
      </Col>
    );

    return (
      <div id={id}>
        <Row>
          <Col md={12}>{title}</Col>
        </Row>
        <br />
        <Row>
          <Packery>
            {mappedTools}
          </Packery>
        </Row>
      </div>
    );
  }
}
