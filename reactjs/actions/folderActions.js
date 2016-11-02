import axios from 'axios';

import { constructConfig } from './common';


const hostname = window.location.origin;
const url = `${hostname}/folders/`;


// Action fetches all folders as well as containing images
export function fetchFolders(token) {
  const config = constructConfig(token);
  return (dispatch) => {
    axios.get(url, config)
      .then((response) => {
        dispatch({ type: 'FETCH_FOLDERS_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_FOLDERS_REJECTED', payload: err });
      });
  };
}

// Creates a new folder on server
export function addFolder(token, name) {
  const config = constructConfig(token);
  return (dispatch) => {
    axios.post(url, { name }, config)
      .then((response) => {
        dispatch({ type: 'ADD_FOLDER_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_FOLDER_REJECTED', payload: err });
      });
  };
}

// Rename folder name on the server
export function renameFolder(obj) {
  const config = constructConfig(obj.token);
  return (dispatch) => {
    axios.put(url + obj.folderId, { name: obj.name }, config)
      .then((response) => {
        dispatch({ type: 'RENAME_FOLDER_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'RENAME_FOLDER_REJECTED', payload: err });
      });
  };
}

// Delete folder from server
export function deleteFolder(obj) {
  const config = constructConfig(obj.token);
  return (dispatch) => {
    axios.delete(url + obj.folderId, config)
      .then(() => {
        dispatch({ type: 'DELETE_FOLDER_FULFILLED', payload: obj.folderId });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_FOLDER_REJECTED', payload: err });
      });
  };
}
