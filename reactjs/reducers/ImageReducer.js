export default function reducer(state={
    activeImage: {
      id: null,
      url: null
    },
    error: null,
  }, action) {

  switch (action.type) {
    case 'CHANGE_ACTIVE_IMAGE': {
      return {...state, activeImage: action.payload}
    }
    case 'APPLY_FILTER_N_EFFECT_TOOLS_REJECTED': {
      return {...state, error: action.payload}
    }
    case 'APPLY_FILTER_N_EFFECT_TOOLS_FULFILLED': {
      const url = action.payload;
      const newActiveImage = {...state.activeImage};
      newActiveImage['url'] = url;

      return {
        ...state,
        activeImage: newActiveImage
      }
    }
  }
  return state
}  
