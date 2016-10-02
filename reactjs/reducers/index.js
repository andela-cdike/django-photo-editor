import { combineReducers } from 'redux';

import cookie from './cookieReducer';
import enhanceTools from './enhanceToolsReducer';
import folders from './folderReducer';
import images from './imageReducer';
import imageProcessorTools from './imageProcessorToolsReducer';
import toolBarVisibility from './toolBarVisibilityReducer';

export default combineReducers({
  cookie,
  enhanceTools,
  folders,
  images,
  imageProcessorTools,
  toolBarVisibility,
})
