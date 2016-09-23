import React from 'react';
import {
  Col, Image, Row
} from 'react-bootstrap';


export default class ThumbNailView extends React.Component {
  render() {
    const { id, title, tools } = this.props;
    const mappedTools = tools.map((tool, i) =>
      <Col key={i} md={4}>
        <Image src={tool.url} alt={tool.name} height="50" rounded />
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
          {mappedTools}
        </Row>
      </div>
    );
  }
}
