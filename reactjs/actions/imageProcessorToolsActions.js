import axios from 'axios';

import { constructConfig } from './common';


const hostname = window.location.origin;
const url = `${hostname}/images/process/tools/`;


// fectches image processor tools information from server
export default function fetchImageProcessorTools(token) {
  const config = constructConfig(token);
  return (dispatch) => {
    axios.get(url, config)
      .then((response) => {
        dispatch({
          type: 'FETCH_IMAGE_PROCESSOR_TOOLS_FULFILLED',
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_IMAGE_PROCESSOR_TOOLS_REJECTED',
          payload: err,
        });
      });
  };
}
