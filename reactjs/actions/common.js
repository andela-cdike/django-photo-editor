// Add JWT token to header
export function constructConfig(token) {
  return {
    headers: {'Authorization': 'JWT ' + token}
  };
}