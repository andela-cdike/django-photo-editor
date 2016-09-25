export default function reducer(state={
    effectTools: [],
    filterTools: [],
    fetching: false,
    fetched: false,
    error: null
  }, action) {

  switch (action.type) {
    case "FETCH_IMAGE_PROCESSOR_TOOLS": {
      return {...state, fetching: true}
    }
    case "FETCH_IMAGE_PROCESSOR_TOOLS_REJECTED": {
      console.log('err: ', action.payload)
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_IMAGE_PROCESSOR_TOOLS_FULFILLED": {
      console.log('tools: ', action.payload)
      return {
        ...state,
        fetching: false,
        fetched: true,
        effectTools: action.payload.effectTools,
        filterTools: action.payload.filterTools
      }
    }
  }
  return state
}
