import React from 'react';
import { ListGroup } from 'react-bootstrap';

import LinkWithTooltip from './LeftToolsGroupBar/LinkWithTooltip';


const LeftToolsGroupBar = ({ dispatch, toolBarVisibility }) => {
  const {
    finder, colorIntensityTools, miscTools,
    filterTools, effectTools,
  } = toolBarVisibility;

  return (
    <ListGroup>
      <LinkWithTooltip
        tooltip="Finder"
        id="finder-tooltip"
        name="finder"
        active={finder}
        dispatch={dispatch}
      >
        <i className="fa fa-folder fa-2x" aria-hidden="true" />
      </LinkWithTooltip>
      <LinkWithTooltip
        tooltip="Color/Intensity Tools"
        id="color-intensity-tooltip"
        name="colorIntensityTools"
        active={colorIntensityTools}
        dispatch={dispatch}
      >
        <i className="fa fa-adjust fa-2x" aria-hidden="true" />
      </LinkWithTooltip>
      <LinkWithTooltip
        tooltip="Misc Tools"
        id="misc-tooltip"
        name="miscTools"
        active={miscTools}
        dispatch={dispatch}
      >
        <i className="fa fa-arrows fa-2x" aria-hidden="true" />
      </LinkWithTooltip>
      <LinkWithTooltip
        tooltip="Filter Tools"
        id="filter-tooltip"
        name="filterTools"
        active={filterTools}
        dispatch={dispatch}
      >
        <i className="fa fa-filter fa-2x" aria-hidden="true" />
      </LinkWithTooltip>
      <LinkWithTooltip
        tooltip="Effect Tools"
        id="effect-tooltip"
        name="effectTools"
        active={effectTools}
        dispatch={dispatch}
      >
        <i className="fa fa-picture-o fa-2x" aria-hidden="true" />
      </LinkWithTooltip>
    </ListGroup>
  );
};

LeftToolsGroupBar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  toolBarVisibility: React.PropTypes.objectOf(
    React.PropTypes.bool,
  ),
};

export default LeftToolsGroupBar;
