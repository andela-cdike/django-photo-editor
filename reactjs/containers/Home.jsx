import React from 'react';
import {
    Col, Grid, Row
} from 'react-bootstrap';
import { connect } from "react-redux";

import {
  updateToolBarVisibility
} from "../actions/toolBarVisibilityActions";
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
  }

  render() {
    // these guys would finally be passed in via redux stores
    const url = window.location.origin + '/static/photo_editor/img/logo.jpg';

    const filterTools = [
      {name: 'Contour', url: url},
      {name: 'Edge Enhance', url: url},
      {name: 'Gaussian blur', url: url},
      {name: 'Max filter', url: url},
      {name: 'Unsharp mask', url: url},
    ];

    const effectTools = [
      {name: 'Grayscale', url: url},
      {name: 'Flip', url: url},
      {name: 'Invert', url: url},
      {name: 'Mirror', url: url},
      {name: 'Posterize', url: url},
      {name: 'Solarize', url: url},
      {name: 'Watermark', url: url},
      {name: 'roll', url: url},
      {name: 'mix1', url: url},
      {name: 'mix2', url: url},
      {name: 'mix3', url: url},
      {name: 'mix4', url: url},
    ];


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
                  filterTools={filterTools}
                  effectTools={effectTools}
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