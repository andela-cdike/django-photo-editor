export default function reducer(state={
    cookie: {
      csrftoken: null,
      user_token: null,
      username: null,
    },
    fetching: true
  }, action) {
  
  switch (action.type) {
    case "OBJECTIFY_COOKIE_FULFILLED": {
      return {
        ...state,
        cookie: action.payload
      }
    }
    case "REFRESH_COOKIE_FULFILLED": {
      const { token } = action.payload;
      const newCookie = {...state.cookie};
      newCookie['user_token'] = action.payload.token;
      
      return {
        ...state,
        cookie: newCookie,
      }
    }
    case "REFRESH_COOKIE_REJECTED": {
      return {
        ...state,
        error: action.payload
      }
    }
  }
  return state
}
