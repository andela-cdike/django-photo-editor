import React from 'react';
import {
  Col, Image, Row
} from 'react-bootstrap';

var Packery = require('react-packery-component')(React);


export default class ThumbNailView extends React.Component {
  handleClick(e) {
    e.preventDefault();
    const image_url = e.currentTarget.href
    console.log('yayayabinks: ', e.currentTarget.href)
    this.props.dispatch(this.props.action(image_url))
  }

  render() {
    const { id, title, tools } = this.props;
    const mappedTools = tools.map((tool, i) =>
      <Col key={i} md={4}>
        <a id={i} href={tool.large_image_url} onClick={this.handleClick.bind(this)}>
            <Image
              src={tool.thumbnail_image_url}
              alt={tool.name}
              height="60"
              width="90%"
              square
            />
            <figcaption>{tool.name}</figcaption>
        </a>
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
