import { combineReducers } from 'redux';

import toolBarVisibility from './toolBarVisibilityReducer';
import enhanceTools from './enhanceToolsReducer';

export default combineReducers({
    toolBarVisibility,
    enhanceTools,
})
