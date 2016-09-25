export default function reducer(state={
    activeImage: "",
    error: null,
  }, action) {

  switch (action.type) {
    case "CHANGE_ACTIVE_IMAGE": {
      return {...state, activeImage: action.payload}
    }
  }
  return state
}  
