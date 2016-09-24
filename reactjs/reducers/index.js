import { combineReducers } from 'redux';

import imageProcessorTools from './imageProcessorToolsReducer';
import toolBarVisibility from './toolBarVisibilityReducer';
import enhanceTools from './enhanceToolsReducer';

export default combineReducers({
  enhanceTools,
  imageProcessorTools,
  toolBarVisibility,
})
