import React from 'react';
import {
  Button, Col, ControlLabel, FormControl, FormGroup,
  Row,
} from 'react-bootstrap';

import {
  applyEffectFilter, resizeImage, showSpinner,
} from '../../actions/imageActions';


export default class MiscToolBar extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.dispatch(showSpinner());
    this.props.dispatch(applyEffectFilter(
      this.props.token, this.props.activeImageId, 'rotate'
    ));
  }

  handleChange(e) {
    const { value } = e.target;
    this.props.dispatch(showSpinner());
    this.props.dispatch(resizeImage(
      this.props.token, this.props.activeImageId, value
    ));
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
                onChange={this.handleChange}
              >
                {mappedSelectOptions}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={11}>
            <Button onClick={this.handleClick}>
              Rotate
              &nbsp;
              <i className="fa fa-undo" aria-hidden="true" />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

MiscToolBar.propTypes = {
  activeImageId: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired,
  token: React.PropTypes.string.isRequired,
};
