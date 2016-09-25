// Add JWT token to header
export function constructConfig(token) {
  return {
    headers: {'Authorization': 'JWT ' + token}
  };
}

// Prepare url for effect and filter tools
export function prepareUrl(operationName, imageId) {
  const hostname = window.location.origin;
  const baseUrl = `${hostname}/images/process/${imageId}`;
  let url = '';

  // split operationName with multiple words into individual words
  // so you could join them with an underscore
  // all mixes (e.g. mix 1, mix 2) must be combined into mix_n_match 
  // to be identified with their accompanying integer
  operationName = operationName.split(' ');

  switch (operationName[0]) {
    case 'mix': {
      url = `${baseUrl}/mix_n_match/${operationName[1]}`;
      break;
    }
    case 'watermark': {
        url = `${baseUrl}/add_watermark`;
        break;
    }
    default: {
      operationName = operationName.join('_');
      url = `${baseUrl}/${operationName}`
    }
  }

  return url
}
