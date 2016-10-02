import React from 'react';

import { applyEffectFilter, showSpinner } from '../actions/imageActions';

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
            ? <FinderToolBar
                folders={this.props.folders}
                dispatch={this.props.dispatch}
                token={this.props.token}
              />
            : null
        }
        {
          colorIntensityTools
            ? <EnhanceToolBar
                enhanceToolsValues={this.props.enhanceToolsValues}
                dispatch={this.props.dispatch}
                activeImageId={this.props.activeImage.id}
                token={this.props.token}
              />
            : null
        }
        {
          miscTools
            ? <MiscToolBar
                activeImageId={this.props.activeImage.id}
                dispatch={this.props.dispatch}
                token={this.props.token}
              />
            : null
        }
        {
          filterTools
            ? <ThumbnailView
                action={applyEffectFilter}
                activeImage={this.props.activeImage}
                dispatch={this.props.dispatch}
                id="filter-toolbar"
                title="FILTER TOOLS"
                items={this.props.filterTools}
                showSpinner={showSpinner}
                token={this.props.token}
              />
            : null
        }
        {
          effectTools
            ? <ThumbnailView
                action={applyEffectFilter}
                activeImage={this.props.activeImage}
                id="effect-toolbar"
                dispatch={this.props.dispatch}
                title="EFFECT TOOLS"
                items={this.props.effectTools}
                showSpinner={showSpinner}
                token={this.props.token}
              />
            : null
        }
      </div>
    );
  }
}
