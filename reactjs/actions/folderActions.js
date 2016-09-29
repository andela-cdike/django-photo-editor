import axios from 'axios';

import { constructConfig } from './common';


const hostname = window.location.origin;
const url = hostname + '/folders/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyRXJpa2EiLCJvcmlnX2lhdCI6MTQ3NTA2MTI4OSwidXNlcl9pZCI6MiwiZW1haWwiOiJhZG1pbkBlbGVjdHJvY29ycC5jb20iLCJleHAiOjE0NzUzNjEyODl9.RqWaMCbNAptMh5EXeeS5VWZTf5498u7hoNWibgCNZgQ'


// Action fetches all folders as well as containing images
export function fetchFolders() {
  const config = constructConfig(token);
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({type: 'FETCH_FOLDERS_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_FOLDERS_REJECTED', payload: err})
      })
  }
}

// Creates a new folder on server
export function addFolder(name) {
  const config = constructConfig(token);
  return function(dispatch) {
    axios.post(url, { name: name }, config)
      .then((response) => {
        dispatch({type: 'ADD_FOLDER_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'ADD_FOLDER_REJECTED', payload: err})
      })
  }
}

// Rename folder name on the server
export function renameFolder(obj) {
  const config = constructConfig(token);
  return function(dispatch) {
    axios.put(url + obj.folderId, {name: obj.name}, config)
      .then((response) => {
        dispatch({type: 'RENAME_FOLDER_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'RENAME_FOLDER_REJECTED', payload: err})
      })
  }
}

// Delete folder from server
export function deleteFolder(obj) {
  const config = constructConfig(token);
  return function(dispatch) {
    axios.delete(url + obj.folderId, config)
      .then((response) => {
        dispatch({type: 'DELETE_FOLDER_FULFILLED', payload: obj.folderId})
      })
      .catch((err) => {
        dispatch({type: 'DELETE_FOLDER_REJECTED', payload: err})
      })
  }
} 