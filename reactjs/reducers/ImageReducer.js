export default function reducer(state={
    activeImage: {
      id: null,
      url: null
    },
    error: null,
  }, action) {

  switch (action.type) {
    case 'CHANGE_ACTIVE_IMAGE': {
      return {...state, activeImage: action.payload};
    }
    case 'APPLY_FILTER_N_EFFECT_TOOLS_REJECTED': {
      return {...state, error: action.payload};
    }
    case 'APPLY_FILTER_N_EFFECT_TOOLS_FULFILLED': {
      const newActiveImage = {...state.activeImage};
      newActiveImage['url'] = action.payload;

      return {...state, activeImage: newActiveImage};
    }
    case 'APPLY_ENHANCE_TOOL_REJECTED': {
      return {...state, error: action.payload};
    }
    case 'APPLY_ENHANCE_TOOL_FULFILLED': {
      const newActiveImage = {...state.activeImage};
      newActiveImage['url'] = action.payload;

      return {...state, activeImage: newActiveImage};
    }
    case 'RESIZE_IMAGE_REJECTED': {
      return {...state, error: action.payload};
    }
    case 'RESIZE_IMAGE_FULFILLED': {
      const newActiveImage = {...state.activeImage};
      newActiveImage['url'] = action.payload;

      return {...state, activeImage: newActiveImage};
    }
  }
  return state
}  
