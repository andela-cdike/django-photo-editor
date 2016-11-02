export default function updateToolBarVisibility(toolGroupName = 'finder') {
  const toolGroups = [
    'finder', 'colorIntensityTools', 'miscTools',
    'filterTools', 'effectTools',
  ];

  const toolBarVisibility = {};
  const len = toolGroups.length;

  for (let i = 0; i < len; i += 1) {
    if (toolGroups[i] === toolGroupName) {
      toolBarVisibility[toolGroups[i]] = true;
    } else {
      toolBarVisibility[toolGroups[i]] = false;
    }
  }

  return {
    type: 'UPDATE_TOOLBAR_VISIBILITY_FULFILLED',
    payload: toolBarVisibility,
  };
}
