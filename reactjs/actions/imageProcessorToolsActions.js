import axios from "axios";

import { constructConfig } from './common';


const hostname = window.location.origin;
const url = hostname + '/image-processors/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyRXJpa2EiLCJvcmlnX2lhdCI6MTQ3NDczOTMxNCwidXNlcl9pZCI6MiwiZW1haWwiOiJhZG1pbkBlbGVjdHJvY29ycC5jb20iLCJleHAiOjE0NzUwMzkzMTR9.iRpgRFPJjA_doBNwA1_c1sVsTbuqoT6DyP2ccEfe4f8'


// fectches image processor tools information from server
export function fetchImageProcessorTools() {
  const config = constructConfig(token);
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({
          type: "FETCH_IMAGE_PROCESSOR_TOOLS_FULFILLED",
          payload: response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_IMAGE_PROCESSOR_TOOLS_REJECTED",
          payload: err
        })
      })
  }
}
