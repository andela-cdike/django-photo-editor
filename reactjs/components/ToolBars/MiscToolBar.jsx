import React from 'react';
import {
  Button, Col, ControlLabel, FormControl, FormGroup,
  ListGroup, ListGroupItem, Row
} from 'react-bootstrap';

import {
  applyEffectFilter, resizeImage, rotateImage, showSpinner
} from '../../actions/imageActions';

import InputRangeSlider from './EnhanceToolBar/InputRangeSlider';


export default class MiscToolBar extends React.Component {
  handleClick(e) {
    this.props.dispatch(showSpinner());
    this.props.dispatch(applyEffectFilter(this.props.activeImageId, 'rotate'));
  }

  handleChange(e) {
    const { value } = e.target;
    this.props.dispatch(showSpinner());
    this.props.dispatch(resizeImage(this.props.activeImageId, value));
  }

  render() {
    const selectOptions = ['very small', 'small', 'medium', 'large'];
    const optionsAlias = ['vsmall', 'small', 'medium', 'large'];
    const mappedSelectOptions = selectOptions.map((option, i) =>
      <option key={i} value={optionsAlias[i]}>{option}</option>
    );

    return (
      <div id="misc-toolbar">
        <Row>
          <Col sm={12}>MISC TOOLS</Col>
        </Row>
        <br />
        <Row>
          <Col sm={11}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Resize</ControlLabel>
              <FormControl 
                componentClass="select"
                placeholder="Select option"
                onChange={this.handleChange.bind(this)}
              >
                {mappedSelectOptions}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={11}>
            <Button onClick={this.handleClick.bind(this)}>
              Rotate
              &nbsp;
              <i class="fa fa-undo" aria-hidden="true"></i>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}