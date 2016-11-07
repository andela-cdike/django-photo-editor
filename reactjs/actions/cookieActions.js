import axios from 'axios';

export function objectifyCookie() {
  // this function converts cookie to an object and returns to user
  const cookie = document.cookie.split('; ');
  const newCookie = {};

  for (let i = 0; i < cookie.length; i += 1) {
    const current = cookie[i].split('=');
    newCookie[current[0]] = current[1];
  }

  return {
    type: 'OBJECTIFY_COOKIE_FULFILLED',
    payload: newCookie,
  };
}

export function refreshToken(token) {
  // this function refreshes the JSON  web token
  const hostname = window.location.origin;
  const url = `${hostname}/api/v1/auth/api-token-refresh/`;

  return (dispatch) => {
    axios.post(url, { token })
      .then((response) => {
        dispatch({ type: 'REFRESH_COOKIE_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'REFRESH_COOKIE_REJECTED', payload: err });
      });
  };
}
