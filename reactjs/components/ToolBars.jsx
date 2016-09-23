import React from 'react';

import EnhanceToolBar from './ToolBars/EnhanceToolBar';
import FinderToolBar from './ToolBars/FinderToolBar';
import MiscToolBar from './ToolBars/MiscToolBar';
import ThumbnailView from './ToolBars/ThumbnailView';


export default class ToolBars extends React.Component {
  render() {
    const {
      finder, colorIntensityTools, miscTools, filterTools, effectTools
    } = this.props.toolBarVisibility;

    return (
      <div>
        {
          finder
            ? <FinderToolBar />
            : null
        }
        {
          colorIntensityTools
            ? <EnhanceToolBar
                enhanceToolsValues={this.props.enhanceToolsValues}
                dispatch={this.props.dispatch}
              />
            : null
        }
        {
          miscTools
            ? <MiscToolBar />
            : null
        }
        {
          filterTools
            ? <ThumbnailView
                tools={this.props.filterTools}
                id="filter-toolbar"
                title="FILTER TOOLS"
              />
            : null
        }
        {
          effectTools
            ? <ThumbnailView
                tools={this.props.effectTools}
                id="effect-toolbar"
                title="EFFECT TOOLS"
              />
            : null
        }
      </div>
    );
  }
}
