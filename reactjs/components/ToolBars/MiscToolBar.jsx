import React from 'react';
import {
  Button, Col, ControlLabel, FormControl, FormGroup,
  ListGroup, ListGroupItem, Row
} from 'react-bootstrap';

import InputRangeSlider from './EnhanceToolBar/InputRangeSlider';

export default class MiscToolBar extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  handleClick(e) {
    console.log("You clicked the rotate button")
  }

  handleChange(e) {
    console.log(`I changed to ${e.target.value}.`)
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