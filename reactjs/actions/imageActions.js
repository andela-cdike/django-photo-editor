import axios from "axios";

import { constructConfig, prepareUrl } from './common';


const hostname = window.location.origin;
const baseUrl = hostname + '/images/process/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyRXJpa2EiLCJvcmlnX2lhdCI6MTQ3NTI0ODY0MSwidXNlcl9pZCI6MiwiZW1haWwiOiJhZG1pbkBlbGVjdHJvY29ycC5jb20iLCJleHAiOjE0NzU1NDg2NDF9.RN8p93fQQC3NV1uQbfSZIvvGTQV04wJ1pOAE3dyV2aQ'


export function changeActiveImage(imageId, imageUrl, imageName) {
  return {
    type: 'CHANGE_ACTIVE_IMAGE',
    payload: {id: imageId, url: imageUrl, name: imageName}
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
          payload: `${response.data.url}?t=${new Date().getTime()}`
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
          payload: `${response.data.url}?t=${new Date().getTime()}`
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
          payload: `${response.data.url}?t=${new Date().getTime()}`
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


export function undoImageProcessing() {
  const url = `${baseUrl}cancel/`;
  const config = constructConfig(token);

  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({
          type: 'UNDO_IMAGE_PROCESSING_FULFILLED',
          payload: `${response.data.url}`
        })
      })
      .catch((err) => {
        dispatch({
          type: 'UNDO_IMAGE_PROCESSING_REJECTED',
          payload: err
        })
      })
  }
}


export function saveImageProcessing(imageId) {
  const url =`${baseUrl}save/${imageId}`;
  const config = constructConfig(token);

  return function(dispatch) {
    axios.put(url, config)
      .then((response) => {
        dispatch({
          type: 'SAVE_IMAGE_PROCESSING_FULFILLED',
          payload: `${response.data.url}`
        })
      })
      .catch((err) => {
        dispatch({
          type: 'SAVE_IMAGE_PROCESSING_REJECTED',
          payload: err
        })
      })
  }
}


export function uploadImage(name, folderId, image) {
  const url = `${hostname}/images/`;
  const config = constructConfig(token);
  let data = new FormData();
  data.append('name', name);
  data.append('folder_id', folderId);
  data.append('image', image);

  return function(dispatch) {
    axios.post(url, data, config)
      .then((response) => {
        dispatch({
          type: 'UPLOAD_IMAGE_FULFILLED',
          payload: response.data          
        })
        dispatch({
          type: 'ADD_NEW_IMAGE_TO_FOLDERS',
          payload: response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: 'UPLOAD_IMAGE_REJECTED',
          payload: err
        })
      })
  }
}


export function renameImage(obj) {
  const url = `${hostname}/images/${obj.imageId}`;
  const config = constructConfig(token);
  let data = new FormData();
  data.append('name', obj.name);

  return function(dispatch) {
    axios.put(url, data, config)
      .then((response) => {
        dispatch({
          type: 'RENAME_IMAGE_FULFILLED',
          payload: {
            imageId: obj.imageId,
            folderId: obj.folderId,
            name: response.data.name
          }
        })
      })
      .catch((err) => {
        dispatch({
          type: 'RENAME_IMAGE_REJECTED',
          payload: err
        })
      })
  }
}

export function deleteImage(obj) {
  const url = `${hostname}/images/${obj.imageId}`;
  const config = constructConfig(token);

  return function(dispatch) {
    axios.delete(url, config)
      .then((response) => {
        dispatch({
          type: 'DELETE_IMAGE_FULFILLED',
          payload: {imageId: obj.imageId, folderId: obj.folderId}
        })
      })
      .catch((err) => {
        dispatch({
          type: 'DELETE_IMAGE_REJECTED',
          payload: err
        })
      })
  }
}


export function resetUploadErrorStatus() {
  return {
    type: 'RESET_UPLOAD_ERROR_STATUS',
    payload: {status: null, msg: null}
  }
}

export function showSpinner() {
  return {
    type: 'SHOW_SPINNER_ANIMATION',
    payload: true
  }
}
