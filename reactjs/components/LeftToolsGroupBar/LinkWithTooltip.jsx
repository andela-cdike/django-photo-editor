import React from 'react';
import { findDomNode } from 'react-dom';

import {
  updateToolBarVisibility
} from "../../actions/toolBarVisibilityActions";

import { ListGroupItem, OverlayTrigger, Tooltip } from 'react-bootstrap';


export default class LinkWithTooltip extends React.Component {
  handleClick(e) {
    const elementName = e.currentTarget.name
    this.props.dispatch(updateToolBarVisibility(elementName))
  }

  render() {
    let tooltip = (
      <Tooltip id={this.props.id} positionLeft={100}>
        {this.props.tooltip}
      </Tooltip>
    );

    return (
      <OverlayTrigger
        overlay={tooltip} placement="right"
        delayShow={300} delayHide={150}
      >
        <ListGroupItem
          onClick={this.handleClick.bind(this)}
          active={this.props.active}
          name={this.props.name}
        >
          {this.props.children}
        </ListGroupItem>
      </OverlayTrigger>
    );
  }
}
