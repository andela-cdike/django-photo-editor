// Add JWT token to header
export function constructConfig(token) {
  return {
    headers: { Authorization: `JWT  ${token}` },
  };
}

// Prepare url for effect and filter tools
export function prepareUrl(imageId, operationName) {
  const hostname = window.location.origin;
  const baseUrl = `${hostname}/images/process/${imageId}`;
  let url = '';

  // split operationName with multiple words into individual words
  // so you could join them with an underscore
  // all mixes (e.g. mix 1, mix 2) must be combined into mix_n_match
  // to be identified with their accompanying integer
  let operationNameCopy = operationName.split(' ');

  switch (operationNameCopy[0]) {
    case 'mix': {
      url = `${baseUrl}/mix_n_match/${operationNameCopy[1]}`;
      break;
    }
    case 'watermark': {
      url = `${baseUrl}/add_watermark`;
      break;
    }
    default: {
      operationNameCopy = operationNameCopy.join('_');
      url = `${baseUrl}/${operationNameCopy}`;
    }
  }

  return url;
}
