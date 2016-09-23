import React from 'react';
import InputRange from 'react-input-range';

import {
    updateEnhanceToolsValues
} from '../../../actions/enhanceToolsActions';


export default class InputRangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      min: 0,
      max: 10,
      value: this.props.value
    }
  }

  handleValueChange(component, value) {
    this.setState({ value: value })
    this.props.dispatch(updateEnhanceToolsValues(component.props.name, value))
  }

  render() {
    return(
      <InputRange
        name={this.props.name}
        minValue={this.state.min}
        maxValue={this.state.max}
        value={this.state.value}
        step={this.state.step}
        onChange={this.handleValueChange.bind(this)}
      />
    );
  }
}
