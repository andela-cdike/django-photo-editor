import React from 'react';
import {
    Col, Grid, Row
} from 'react-bootstrap';
import { connect } from "react-redux";

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
    toolBarVisibility: store.toolBarVisibility.toolBarVisibility,
    enhanceToolsValues: store.enhanceTools.enhanceToolsValues,
    effectTools: store.imageProcessorTools.effectTools,
    filterTools: store.imageProcessorTools.filterTools,
  };
})

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    this.props.dispatch(updateToolBarVisibility())
    this.props.dispatch(updateEnhanceToolsValues())
    this.props.dispatch(fetchImageProcessorTools())
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
                  toolBarVisibility={this.props.toolBarVisibility}
                  enhanceToolsValues={this.props.enhanceToolsValues}
                  dispatch={this.props.dispatch}
                  filterTools={this.props.filterTools}
                  effectTools={this.props.effectTools}
                />
              </Col>
              <Col md={8} id="image-pane">
                <ImagePane />
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