import axios from "axios";

// fectches image processor tools information from server
export function fetchImageProcessorTools() {
  const hostname = window.location.origin;
  const url = hostname + '/image-processors/';

  return function(dispatch) {
    axios.get(url)
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