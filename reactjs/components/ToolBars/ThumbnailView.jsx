import React from 'react';
import {
  Col, Image, Row,
} from 'react-bootstrap';

const Packery = require('react-packery-component')(React);


export default class ThumbNailView extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  // Calls appropriate actions when thumbnail is clicked
  handleClick(e) {
    e.preventDefault();
    const imageId = e.currentTarget.id;
    this.props.dispatch(this.props.showSpinner());

    // separate image thumbnails from tools thumbnails
    if (this.props.title === '') {
      const url = e.currentTarget.href;
      const name = e.currentTarget.name;
      const folderId = e.currentTarget.getAttribute('data-folderid');
      this.props.dispatch(this.props.action(folderId, imageId, url, name));
    } else {
      const url = e.currentTarget.name;
      this.props.dispatch(this.props.action(this.props.token, imageId, url));
    }
  }

  render() {
    const { id, title, items } = this.props;

    const mappedItems = items.map((item, i) =>
      <Col key={i} md={4} class="image-thumbnail">
        <a
          id={item.id || this.props.activeImageId}
          data-folderid={item.folder || null}
          name={item.name}
          href={item.large_image_url || '#'}
          onClick={this.handleClick}
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

ThumbNailView.propTypes = {
  action: React.PropTypes.func.isRequired,
  activeImageId: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string,
  items: React.PropTypes.arrayOf(
    React.PropTypes.object,
  ),
  showSpinner: React.PropTypes.func.isRequired,
  title: React.PropTypes.string,
  thumbnailMenu: React.PropTypes.node,
  token: React.PropTypes.string.isRequired,
};
