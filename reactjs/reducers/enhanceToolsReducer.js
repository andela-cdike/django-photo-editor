export default function reducer(state = {
  enhanceToolsValues: {
    contrast: 5,
    brightness: 5,
    sharpness: 5,
    color: 5,
  },
  fetching: false,
  fetched: true,
  error: null,
}, action) {
  switch (action.type) {
    case 'INITIALIZE_ENHANCE_TOOLS_VALUES': {
      return { ...state };
    }
    case 'UPDATE_CONTRAST_VALUE': {
      return {
        ...state,
        enhanceToolsValues: {
          ...state.enhanceToolsValues, contrast: action.payload,
        },
      };
    }
    case 'UPDATE_BRIGHTNESS_VALUE': {
      return {
        ...state,
        enhanceToolsValues: {
          ...state.enhanceToolsValues, brightness: action.payload,
        },
      };
    }
    case 'UPDATE_SHARPNESS_VALUE': {
      return {
        ...state,
        enhanceToolsValues: {
          ...state.enhanceToolsValues, sharpness: action.payload,
        },
      };
    }
    case 'UPDATE_COLOR_VALUE': {
      return {
        ...state,
        enhanceToolsValue: {
          ...state.enhanceToolsValues, color: action.payload,
        },
      };
    }
    case 'UPDATE_ENHANCE_TOOLS_REJECTED': {
      return {
        ...state,
        error: action.payload,
      };
    }

    // no default
  }
  return state;
}
