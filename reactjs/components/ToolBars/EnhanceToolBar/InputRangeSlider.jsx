import React from 'react';
import InputRange from 'react-input-range';

import { 
  showSpinner, applyEnhanceTools
} from '../../../actions/imageActions';
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
    const { name } = component.props;
    const { activeImageId } = this.props;

    this.setState({ value: value });
    this.props.dispatch(showSpinner());
    this.props.dispatch(
      applyEnhanceTools(activeImageId, name, value)
    );
    this.props.dispatch(updateEnhanceToolsValues(name, value));
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
