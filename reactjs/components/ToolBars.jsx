import React from 'react';

import { applyEffectFilter, showSpinner } from '../actions/imageActions';

import EnhanceToolBar from './ToolBars/EnhanceToolBar';
import FinderToolBar from './ToolBars/FinderToolBar';
import MiscToolBar from './ToolBars/MiscToolBar';
import ThumbnailView from './ToolBars/ThumbnailView';


const ToolBars = (props) => {
  const {
    finder, colorIntensityTools, miscTools, filterTools, effectTools,
  } = props.toolBarVisibility;

  return (
    <div>
      {
        finder
          ?
            <FinderToolBar
              folders={props.folders}
              dispatch={props.dispatch}
              token={props.token}
            />
          : null
      }
      {
        colorIntensityTools
          ?
            <EnhanceToolBar
              enhanceToolsValues={props.enhanceToolsValues}
              dispatch={props.dispatch}
              activeImageId={props.activeImage.id}
              token={props.token}
            />
          : null
      }
      {
        miscTools
          ?
            <MiscToolBar
              activeImageId={props.activeImage.id}
              dispatch={props.dispatch}
              token={props.token}
            />
          : null
      }
      {
        filterTools
          ?
            <ThumbnailView
              action={applyEffectFilter}
              activeImageId={props.activeImage.id}
              dispatch={props.dispatch}
              id="filter-toolbar"
              title="FILTER TOOLS"
              items={props.filterTools}
              showSpinner={showSpinner}
              token={props.token}
            />
          : null
      }
      {
        effectTools
          ?
            <ThumbnailView
              action={applyEffectFilter}
              activeImageId={props.activeImage.id}
              id="effect-toolbar"
              dispatch={props.dispatch}
              title="EFFECT TOOLS"
              items={props.effectTools}
              showSpinner={showSpinner}
              token={props.token}
            />
          : null
      }
    </div>
  );
};

ToolBars.propTypes = {
  activeImage: React.PropTypes.shape({
    id: React.PropTypes.number,
  }),
  dispatch: React.PropTypes.func,
  effectTools: React.PropTypes.arrayOf(
    React.PropTypes.object,
  ),
  enhanceToolsValues: React.PropTypes.objectOf(
    React.PropTypes.number,
  ),
  filterTools: React.PropTypes.arrayOf(
    React.PropTypes.object,
  ),
  folders: React.PropTypes.arrayOf(
    React.PropTypes.object,
  ),
  token: React.PropTypes.string,
  toolBarVisibility: React.PropTypes.objectOf(
    React.PropTypes.bool,
  ),
};

export default ToolBars;
