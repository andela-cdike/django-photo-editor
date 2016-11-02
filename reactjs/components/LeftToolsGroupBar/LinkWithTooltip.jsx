import React from 'react';
import { ListGroupItem, OverlayTrigger, Tooltip } from 'react-bootstrap';

import updateToolBarVisibility
  from '../../actions/toolBarVisibilityActions';


export default class LinkWithTooltip extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const elementName = e.currentTarget.name;
    this.props.dispatch(updateToolBarVisibility(elementName));
  }

  render() {
    const tooltip = (
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
          onClick={this.handleClick}
          active={this.props.active}
          name={this.props.name}
        >
          {this.props.children}
        </ListGroupItem>
      </OverlayTrigger>
    );
  }
}

LinkWithTooltip.propTypes = {
  active: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  tooltip: React.PropTypes.string.isRequired,
};
