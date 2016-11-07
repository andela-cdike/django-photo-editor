import React from 'react';
import {
  Col, Row,
} from 'react-bootstrap';

import InputRangeSlider from './EnhanceToolBar/InputRangeSlider';


const EnhanceToolBar = ({ activeImageId, dispatch, enhanceToolsValues, token }) => {
  const enhanceTools = [
    'contrast', 'brightness', 'sharpness', 'color',
  ];

  const mappedEnhanceTools = enhanceTools.map((tool, i) =>
    <div key={i} className="formField">
      <p>{tool}</p>
      <InputRangeSlider
        dispatch={dispatch}
        activeImageId={activeImageId}
        name={tool}
        value={enhanceToolsValues[tool]}
        token={token}
      />
    </div>
  );

  return (
    <div>
      <Row>
        <Col md={12}>ENHANCE TOOLS</Col>
      </Row>
      <br />
      <form className="form">
        {mappedEnhanceTools}
      </form>
    </div>
  );
};

EnhanceToolBar.propTypes = {
  activeImageId: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired,
  enhanceToolsValues: React.PropTypes.objectOf(
    React.PropTypes.number,
  ),
  token: React.PropTypes.string.isRequired,
};

export default EnhanceToolBar;
