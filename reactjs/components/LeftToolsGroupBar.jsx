import React from 'react';
import {
  ListGroup, ListGroupItem, OverlayTrigger, Tooltip
} from 'react-bootstrap';

import {
  updateToolBarVisibility
} from "../actions/toolBarVisibilityActions";

import LinkWithTooltip from './LeftToolsGroupBar/LinkWithTooltip';


export default class LeftToolsGroupBar extends React.Component {
  render() {
    const {
      finder, colorIntensityTools, miscTools,
      filterTools, effectTools
    } = this.props.toolBarVisibility

    return (
      <ListGroup>
        <LinkWithTooltip
          tooltip="Finder"
          id="finder-tooltip"
          name="finder"
          active={finder}
          onSelectGroupToolBar={this.selectGroupToolBar}
          dispatch={this.props.dispatch}
        >
          <i class="fa fa-folder fa-2x" aria-hidden="true"></i>
        </LinkWithTooltip>
        <LinkWithTooltip
          tooltip="Color/Intensity Tools"
          id="color-intensity-tooltip"
          name="colorIntensityTools"
          active={colorIntensityTools}
          onSelectGroupToolBar={this.selectGroupToolBar}
          dispatch={this.props.dispatch}
        >
          <i class="fa fa-adjust fa-2x" aria-hidden="true"></i>
        </LinkWithTooltip>
        <LinkWithTooltip
          tooltip="Misc Tools"
          id="misc-tooltip"
          name="miscTools"
          active={miscTools}
          onSelectGroupToolBar={this.selectGroupToolBar}
          dispatch={this.props.dispatch}
        >
          <i class="fa fa-arrows fa-2x" aria-hidden="true"></i>
        </LinkWithTooltip>
        <LinkWithTooltip
          tooltip="Filter Tools"
          id="filter-tooltip"
          name="filterTools"
          active={filterTools}
          onSelectGroupToolBar={this.selectGroupToolBar}
          dispatch={this.props.dispatch}
        >
          <i class="fa fa-filter fa-2x" aria-hidden="true"></i>
        </LinkWithTooltip>
        <LinkWithTooltip
          tooltip="Effect Tools"
          id="effect-tooltip"
          name="effectTools"
          active={effectTools}
          onSelectGroupToolBar={this.selectGroupToolBar}
          dispatch={this.props.dispatch}
        >
          <i class="fa fa-picture-o fa-2x" aria-hidden="true"></i>
        </LinkWithTooltip>
      </ListGroup>
    );
  }
}