export function updateToolBarVisibility(toolGroupName='finder') {
  const toolGroups = [
    'finder', 'colorIntensityTools', 'miscTools',
    'filterTools', 'effectTools'
  ]

  var toolBarVisibility = {}
  const len = toolGroups.length

  for (var i = 0; i < len; i++) {
    if (toolGroups[i] === toolGroupName) {
      toolBarVisibility[toolGroups[i]] = true
    }
    else {
      toolBarVisibility[toolGroups[i]] = false      
    }
  }

  return {
    type: "UPDATE_TOOLBAR_VISIBILITY_FULFILLED",
    payload: toolBarVisibility
  }
}