import React from 'react';
import {
  Col, Image, Row
} from 'react-bootstrap';

var Packery = require('react-packery-component')(React);


export default class ThumbNailView extends React.Component {
  handleClick(e) {
    e.preventDefault();
    const imageId = e.currentTarget.id
    if (this.props.title === '') {
      const url = e.currentTarget.href
      this.props.dispatch(this.props.action(imageId, url));
    } else {
      console.log('shou;ndndgk be here: ', imageId)
      const url = e.currentTarget.name
      this.props.dispatch(this.props.action(imageId, url));
    }
  }

  render() {
    const { id, title, items } = this.props;
    const mappedItems = items.map((item, i) =>
      <Col key={i} md={4}>
        <a
          id={item.id || this.props.activeImage.id}
          name = {item.name}
          href={item.large_image_url}
          onClick={this.handleClick.bind(this)}
        >
            <Image
              src={item.thumbnail_image_url}
              alt={item.name}
              height="60"
              width="90%"
              square
            />
            <figcaption>{item.name}</figcaption>
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
            {mappedItems}
          </Packery>
        </Row>
      </div>
    );
  }
}
