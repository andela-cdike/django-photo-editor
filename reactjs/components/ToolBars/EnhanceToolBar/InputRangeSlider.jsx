import React from 'react';
import InputRange from 'react-input-range';

import {
  showSpinner, applyEnhanceTools,
} from '../../../actions/imageActions';
import updateEnhanceToolsValues
  from '../../../actions/enhanceToolsActions';


export default class InputRangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.state = {
      step: 1,
      min: 0,
      max: 10,
      value: this.props.value,
    };
  }

  handleValueChange(component, value) {
    const { name } = component.props;
    const { activeImageId, token } = this.props;

    this.setState({ value });
    this.props.dispatch(showSpinner());
    this.props.dispatch(
      applyEnhanceTools(token, activeImageId, name, value)
    );
    this.props.dispatch(updateEnhanceToolsValues(name, value));
  }

  render() {
    return (
      <InputRange
        name={this.props.name}
        minValue={this.state.min}
        maxValue={this.state.max}
        value={this.state.value}
        step={this.state.step}
        onChange={this.handleValueChange}
      />
    );
  }
}

InputRangeSlider.propTypes = {
  activeImageId: React.PropTypes.number,
  dispatch: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  token: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};
