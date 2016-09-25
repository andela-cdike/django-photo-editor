import axios from "axios";

import { constructConfig, prepareUrl } from './common';


const hostname = window.location.origin;
const baseUrl = hostname + '/image/process/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyRXJpa2EiLCJvcmlnX2lhdCI6MTQ3NDczOTMxNCwidXNlcl9pZCI6MiwiZW1haWwiOiJhZG1pbkBlbGVjdHJvY29ycC5jb20iLCJleHAiOjE0NzUwMzkzMTR9.iRpgRFPJjA_doBNwA1_c1sVsTbuqoT6DyP2ccEfe4f8'


export function changeActiveImage(imageUrl, imageId) {
  return {
    type: 'CHANGE_ACTIVE_IMAGE',
    payload: {id: imageId, url: imageUrl}
  }
}

export function applyEffectFilter(operationName, imageId) {
  const url = prepareUrl(operationName, imageId);
  const config = constructConfig(token);
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({
          type: 'APPLY_FILTER_N_EFFECT_TOOLS_FULFILLED',
          payload: `${response.data}?t=${new Date().getTime()}`
        })
      })
      .catch((err) => {
        dispatch({
          type: 'APPLY_FILTER_N_EFFECT_TOOLS_REJECTED',
          payload: err
        })
      })
  }
}
