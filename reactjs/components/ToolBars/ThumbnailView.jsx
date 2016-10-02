import React from 'react';
import {
  Col, Image, Row
} from 'react-bootstrap';

var Packery = require('react-packery-component')(React);


export default class ThumbNailView extends React.Component {
  handleClick(e) {
    e.preventDefault();
    const imageId = e.currentTarget.id
    this.props.dispatch(this.props.showSpinner());

    // separate image thumbnails from tools thumbnails
    if (this.props.title === '') {
      const url = e.currentTarget.href;
      const name = e.currentTarget.name
      this.props.dispatch(this.props.action(imageId, url, name));
    } else {
      const url = e.currentTarget.name;
      this.props.dispatch(this.props.action(this.props.token, imageId, url));
    }
  }

  render() {
    const { id, title, items, shouldHaveOptions } = this.props;

    const mappedItems = items.map((item, i) =>
      <Col key={item.id} md={4} class="image-thumbnail">
        <a
          id={item.id || this.props.activeImage.id}
          data-folderid={item.folder || null}
          name = {item.name}
          href={item.large_image_url || '#'}
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
        {this.props.thumbnailMenu || null}
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
