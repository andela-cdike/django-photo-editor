export default function reducer(state = {
  toolBarVisibility: {
    finder: false,
    colorIntensityTools: false,
    miscTools: false,
    filterTools: false,
    effectTools: false,
  },
  fetching: false,
}, action) {
  switch (action.type) {
    case 'UPDATE_TOOLBAR_VISIBILITY': {
      return { ...state, fetching: true };
    }
    case 'UPDATE_TOOLBAR_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'UPDATE_TOOLBAR_VISIBILITY_FULFILLED': {
      return {
        ...state,
        fetching: false,
        toolBarVisibility: action.payload,
      };
    }

    // no default
  }
  return state;
}
