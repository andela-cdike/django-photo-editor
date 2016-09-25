import { combineReducers } from 'redux';

import enhanceTools from './enhanceToolsReducer';
import folders from './folderReducer';
import images from './imageReducer';
import imageProcessorTools from './imageProcessorToolsReducer';
import toolBarVisibility from './toolBarVisibilityReducer';

export default combineReducers({
  enhanceTools,
  folders,
  images,
  imageProcessorTools,
  toolBarVisibility,
})
