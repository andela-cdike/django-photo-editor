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
import StatusBar from '../components/StatusBar';
import TopMenuBar from '../components/TopMenuBar';

import { shouldRefreshToken } from "../utils/refreshToken";


@connect((store) => {
  return {
    activeImage: store.images.activeImage,
    cookie: store.cookie.cookie,
    effectTools: store.imageProcessorTools.effectTools,
    enhanceToolsValues: store.enhanceTools.enhanceToolsValues,
    filterTools: store.imageProcessorTools.filterTools,
    folders: store.folders,
    processingInProgress: store.images.processingInProgress,
    showSpinner: store.images.showSpinner,
    statistics: store.folders.statistics,
    toolBarVisibility: store.toolBarVisibility.toolBarVisibility,
    uploadImageErrorStatus: store.images.uploadImageErrorStatus,
  };
})


export default class Home extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchFolders(this.props.cookie.user_token));
    this.props.dispatch(fetchImageProcessorTools(this.props.cookie.user_token));
    this.props.dispatch(updateToolBarVisibility());
    this.props.dispatch(updateEnhanceToolsValues());
  }

  componentWillReceiveProps(nextprops) {
    // check JWT expiry time
    if (shouldRefreshToken(nextprops.cookie.user_token)) {
      this.props.dispatch(refreshToken(nextprops.cookie.user_token));
    }
  }

  render() {
    return (
      <main>
        <header role="banner" id="nav-header">
          <Navigation />
        </header>

        <section id="content">
          <Grid>
            <Row id="top-menu-bar">
              <Col lg={12}>
                <TopMenuBar
                  activeImage={this.props.activeImage}
                  dispatch={this.props.dispatch}
                  folders={this.props.folders}
                  processingInProgress={this.props.processingInProgress}
                  token={this.props.cookie.user_token}
                  uploadImageErrorStatus={this.props.uploadImageErrorStatus}
                />
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
                  token={this.props.cookie.user_token}
                  toolBarVisibility={this.props.toolBarVisibility}
                />
              </Col>
              <Col md={8} id="image-pane">
                <ImagePane
                  activeImage={this.props.activeImage}
                  showSpinner={this.props.showSpinner}
                />
              </Col>
            </Row>
            <Row id="bottom-status-bar">
              <Col md={12}>
                <StatusBar
                  activeImage={this.props.activeImage}
                  processingInProgress={this.props.processingInProgress}
                  showSpinner={this.props.showSpinner}
                  statistics={this.props.statistics}
                  uploadImageErrorStatus={this.props.uploadImageErrorStatus}
                />
              </Col>
            </Row>
          </Grid>
        </section>
      </main>

    )
  }
}