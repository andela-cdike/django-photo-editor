import axios from "axios";

import { constructConfig, prepareUrl } from './common';


const hostname = window.location.origin;
const baseUrl = hostname + '/images/process/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyRXJpa2EiLCJvcmlnX2lhdCI6MTQ3NDczOTMxNCwidXNlcl9pZCI6MiwiZW1haWwiOiJhZG1pbkBlbGVjdHJvY29ycC5jb20iLCJleHAiOjE0NzUwMzkzMTR9.iRpgRFPJjA_doBNwA1_c1sVsTbuqoT6DyP2ccEfe4f8'


export function changeActiveImage(imageId, imageUrl) {
  return {
    type: 'CHANGE_ACTIVE_IMAGE',
    payload: {id: imageId, url: imageUrl}
  }
}

export function applyEffectFilter(imageId, operationName) {
  const url = prepareUrl(imageId, operationName);
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


export function applyEnhanceTools(imageId, enhanceToolName, newValue) {
  const url = `${baseUrl}${imageId}/${enhanceToolName}/${newValue}`;
  const config = constructConfig(token);

  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({
          type: 'APPLY_ENHANCE_TOOL_FULFILLED',
          payload: `${response.data}?t=${new Date().getTime()}`
        })
      })
      .catch((err) => {
        dispatch({
          type: 'APPLY_ENHANCE_TOOL_REJECTED',
          payload: err
        })
      })
  }
}


export function resizeImage(imageId, option) {
  const url =  `${baseUrl}${imageId}/resize/${option}`;
  const config = constructConfig(token);

  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({
          type: 'RESIZE_IMAGE_FULFILLED',
          payload: `${response.data}?t=${new Date().getTime()}`
        })
      })
      .catch((err) => {
        dispatch({
          type: 'RESIZE_IMAGE_REJECTED',
          payload: err
        })
      })
  }
} 


// export function rotateImage(imageId) {

// }
