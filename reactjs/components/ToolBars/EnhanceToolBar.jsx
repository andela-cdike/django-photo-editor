import React from 'react';
import {
  Col, Row
} from 'react-bootstrap';

import InputRangeSlider from './EnhanceToolBar/InputRangeSlider';


export default class EnhanceToolBar extends React.Component {
  render() {
    const { 
      contrast, brightness, sharpness, color
    } = this.props.enhanceToolsValues;
    const enhanceToolsValues = [
      contrast, brightness, sharpness, color
    ];
    const enhanceTools = [
      'contrast', 'brightness', 'sharpness', 'color'
    ];
    const numTools = enhanceTools.length

    const mappedEnhanceTools = enhanceTools.map((tool, i) =>
      <div key={i} class="formField">
        <p>{tool}</p>
        <InputRangeSlider
          dispatch={this.props.dispatch}
          activeImageId={this.props.activeImageId}
          name={tool}
          value={enhanceToolsValues[i]}
          token={this.props.token}
        />
      </div>
    );

    return (
      <div>
        <Row>
          <Col md={12}>ENHANCE TOOLS</Col>
        </Row>
        <br />
        <form class="form">
          {mappedEnhanceTools}
        </form>
      </div>
    );
  }
}