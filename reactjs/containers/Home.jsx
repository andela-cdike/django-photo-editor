import React from 'react';
import {
    Col, Grid, Row
} from 'react-bootstrap';
import { connect } from "react-redux";

import { fetchFolders } from '../actions/folderActions';
import {
  fetchImageProcessorTools
} from '../actions/imageProcessorToolsActions';
import {
  updateToolBarVisibility
} from '../actions/toolBarVisibilityActions';
import {
    updateEnhanceToolsValues
} from '../actions/enhanceToolsActions';

import ImagePane from '../components/ImagePane';
import LeftToolsGroupBar from '../components/LeftToolsGroupBar';
import Navigation from '../components/Navigation';
import ToolBars from '../components/ToolBars';
import TopMenuBar from '../components/TopMenuBar';


@connect((store) => {
  return {
    activeImage: store.images.activeImage,
    effectTools: store.imageProcessorTools.effectTools,
    enhanceToolsValues: store.enhanceTools.enhanceToolsValues,
    filterTools: store.imageProcessorTools.filterTools,
    folders: store.folders,
    toolBarVisibility: store.toolBarVisibility.toolBarVisibility,
  };
})

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchFolders());
    this.props.dispatch(updateToolBarVisibility());
    this.props.dispatch(updateEnhanceToolsValues());
    this.props.dispatch(fetchImageProcessorTools());
  }

  render() {
    console.log('folders: ', this.props.folders)
    console.log('filterTools: ', this.props.filterTools)
    console.log('effectTools: ', this.props.effectTools)
    return (
      <main>
        <header role="banner" id="nav-header">
          <Navigation />
        </header>

        <section id="content">
          <Grid>
            <Row id="top-menu-bar">
              <Col lg={12}>
                <TopMenuBar />
              </Col>
            </Row>
            <Row id="mid">
              <Col md={1} id="left-tools-group-bar">
                <LeftToolsGroupBar
                  toolBarVisibility={this.props.toolBarVisibility}
                  dispatch={this.props.dispatch}
                />
              </Col>
              <Col md={3} id="toolbar">
                <ToolBars
                  activeImage={this.props.activeImage}
                  dispatch={this.props.dispatch}
                  effectTools={this.props.effectTools}
                  enhanceToolsValues={this.props.enhanceToolsValues}
                  filterTools={this.props.filterTools}
                  folders={this.props.folders}
                  toolBarVisibility={this.props.toolBarVisibility}
                />
              </Col>
              <Col md={8} id="image-pane">
                <ImagePane
                  activeImage={this.props.activeImage}
                  dispatch={this.props.dispatch}
                />
              </Col>
            </Row>
            <Row id="bottom-status-bar">
              <Col md={12}>
                STATUS: 200 OK
              </Col>
            </Row>
          </Grid>
        </section>
      </main>

    )
  }
}